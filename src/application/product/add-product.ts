import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { Product } from "../../domain/product/Product";
import { ProductRepository } from "../../domain/product/product-repository";
import { IShopRepository } from "../../domain/shop/shop-repository";
import { IUserRepository } from "../../domain/user/user-repository";
import { FindShop } from "./services/find-shop";

interface IAddProduct {
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
interface SaveProductRepository {
  productRepository: ProductRepository;
  shopRepository: IShopRepository;
  userRepository: IUserRepository;
}

export class SaveProduct {
  private productRepository: ProductRepository;
  private shopRepository: IShopRepository;
  private userRepository: IUserRepository;
  constructor(repository: SaveProductRepository) {
    this.productRepository = repository.productRepository;
    this.shopRepository = repository.shopRepository;
    this.userRepository = repository.userRepository;
  }
  async execute(product: IAddProduct) {
    try {
      const findShop = await new FindShop({
        shopRepository: this.shopRepository,
        userRepository: this.userRepository,
      }).execute({ shopId: product.shopId, userId: product.userId });

      if (!findShop)
        throw new Exception("Shop not found", StatusCode.BAD_REQUEST);

      const productNew = new Product({
        name: product.name,
        description: product.description,
        price: product.price,
        photo: product.photo,
        shopId: product.shopId,
        quantity: product.quantity,
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
