import { Redis } from "ioredis";
import { IShopRepository } from "../../../adapters/shop/shop-repository";
import { IUserRepository } from "../../../adapters/user/user-repository";

interface FindShopData {
  shopId: string;
  userId: string;
}

export class FindShop {
  private shopRepository: IShopRepository;
  private userRepository: IUserRepository;
  constructor(
    shopRepository: IShopRepository,
    userRepository: IUserRepository
  ) {
    this.shopRepository = shopRepository;
    this.userRepository = userRepository;
  }
  async execute(data: FindShopData) {
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
