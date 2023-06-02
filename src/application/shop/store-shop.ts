import { IShopRepository } from "../../adapters/shop/shop-repository";
import { IUserRepository } from "../../adapters/user/user-repository";
import { Product } from "../../domain/product/Product";
import { Description, Name } from "../../domain/product/product-name";
import { Price } from "../../domain/product/product-price";
import { Quantity } from "../../domain/product/product-quantity";
import { Shop } from "../../domain/shop/Shop";
import { ContentPage } from "../../domain/shop/content-shop";
import { HandleCode } from "../common/handleReturn";

interface ISaveShopData {
  ownerId: string;
  name: string;
  description: string;
  content: {
    title: string;
    content: string;
  };
  products?: [
    {
      name: string;
      price: number;
      description: string;
      photo: string;
      category: string;
      quantity: number;
    }
  ];
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

  async execute(shopData: ISaveShopData) {
    try {
      const owner = await this.userRepository.findById(shopData.ownerId);
      if (!owner) throw new Error("User not found");

      const shop = new Shop({
        owner: owner,
        name: shopData.name,
        description: shopData.description,
        content: new ContentPage(
          shopData.content.title,
          shopData.content.content
        ),
      });
      shopData.products?.forEach((product) => {
        shop.addProduct(
          new Product({
            name: new Name(product.name),
            shopId: shop.id,
            price: new Price({ price: product.price }),
            description: new Description(product.description),
            photo: product.photo,
            category: product.category,
            quantity: new Quantity({ quantity: product.quantity }),
          })
        );
      });
      await this.shopRepository.create(shop);
      return {
        statusCode: HandleCode.CREATED,
        body: { response: "Your shop created with success" },
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}
