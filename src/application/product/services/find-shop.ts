import { IShopRepository } from "../../../adapters/shop/shop-repository";

export class FindShop {
  private shopRepository: IShopRepository;
  constructor(shopRepository: IShopRepository) {
    this.shopRepository = shopRepository;
  }
  async execute(shopId: string) {
    return await this.shopRepository.getById(shopId);
  }
}
