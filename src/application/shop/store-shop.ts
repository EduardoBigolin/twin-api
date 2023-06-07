import { IShopRepository } from "../../adapters/shop/shop-repository";
import { IUserRepository } from "../../adapters/user/user-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { Shop } from "../../domain/shop/Shop";
import { ContentPage } from "../../domain/shop/content-shop";

interface SaveShopData {
  ownerId: string;
  name: string;
  description: string;
  content: {
    title: string;
    content: string;
  };
}

export class StoreShop {
  public shopRepository: IShopRepository;
  public userRepository: IUserRepository;

  constructor(
    shopRepository: IShopRepository,
    userRepository: IUserRepository
  ) {
    this.shopRepository = shopRepository;
    this.userRepository = userRepository;
  }

  async execute(shopData: SaveShopData) {
    try {
      const findUser = await this.userRepository.findById(shopData.ownerId);
      if (!findUser)
        throw new Exception("User not found", StatusCode.BAD_REQUEST);

      const shop = new Shop({
        ownerId: findUser.getId(),
        name: shopData.name,
        description: shopData.description,
        content: new ContentPage(
          shopData.content.title,
          shopData.content.content
        ),
      });

      const shopSave = await this.shopRepository.create(shop);

      return {
        statusCode: StatusCode.CREATED,
        body: {
          response: {
            id: shopSave.id,
            name: shopSave.name,
            description: shopSave.description,
            content: shopSave.content,
          },
        },
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}
