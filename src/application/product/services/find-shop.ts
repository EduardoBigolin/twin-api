import { Redis } from "ioredis";
import { IShopRepository } from "../../../domain/shop/shop-repository";
import { IUserRepository } from "../../../domain/user/user-repository";

interface IFindShop {
  shopId: string;
  userId: string;
}
interface FindShopRepository {
  shopRepository: IShopRepository;
  userRepository: IUserRepository;
}

export class FindShop {
  private shopRepository: IShopRepository;
  private userRepository: IUserRepository;
  constructor(repository: FindShopRepository) {
    this.shopRepository = repository.shopRepository;
    this.userRepository = repository.userRepository;
  }
  async execute(data: IFindShop) {
    const redisFind = await new Redis().get(data.shopId);

    if (redisFind) {
      const { user } = JSON.parse(redisFind);

      if (user !== data.userId) {
        return null;
      }
      return await this.shopRepository.getById(data.shopId);
    }

    const findShop = await this.shopRepository.getById(data.shopId);

    const findUser = await this.userRepository.findById(data.userId);
    if (!findShop || !findUser) {
      return null;
    }
    if (findShop.ownerId !== findUser.getId()) {
      return null;
    }
    await new Redis().set(
      findShop.id,
      JSON.stringify({ shop: findShop.id, user: findUser.id })
    );
    return findShop;
  }
}
