import { ProductRepository } from "../../adapters/product/product-repository";
import { IShopRepository } from "../../adapters/shop/shop-repository";
import { IUserRepository } from "../../adapters/user/user-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { Product } from "../../domain/product/Product";
import { Description, Name } from "../../domain/product/product-name";
import { Price } from "../../domain/product/product-price";
import { Quantity } from "../../domain/product/product-quantity";
import { FindShop } from "./services/find-shop";

interface AddProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category?: string;
  photo?: string;
  shopId: string;
  userId: string;
}

export class SaveProduct {
  private productRepository: ProductRepository;
  private shopRepository: IShopRepository;
  private userRepository: IUserRepository;
  constructor(
    productRepository: ProductRepository,
    shopRepository: IShopRepository,
    userRepository: IUserRepository
  ) {
    this.productRepository = productRepository;
    this.shopRepository = shopRepository;
    this.userRepository = userRepository;
  }
  async execute(product: AddProductData) {
    try {
      const findShop = await new FindShop(
        this.shopRepository,
        this.userRepository
      ).execute({ shopId: product.shopId, userId: product.userId });

      if (!findShop)
        throw new Exception("Shop not found", StatusCode.BAD_REQUEST);

      const productNew = new Product({
        name: new Name(product.name),
        description: new Description(product.description),
        price: new Price({ price: product.price }),
        photo: product.photo,
        shopId: product.shopId,
        quantity: new Quantity({ quantity: product.quantity }),
      });

      await this.productRepository.create(productNew);

      return {
        statusCode: StatusCode.OK,
        body: {
          message: "Product created with success",
          product: productNew.id,
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
