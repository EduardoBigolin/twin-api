import { Cart } from "../../domain/cart/Cart";
import { CartRepository } from "../../domain/cart/cart-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { ProductRepository } from "../../domain/product/product-repository";
import { IUserRepository } from "../../domain/user/user-repository";

interface RepositoryCart {
  readonly cartRepository: CartRepository;
  readonly userRepository: IUserRepository;
  readonly productRepository: ProductRepository;
}

interface CartData {
  userId: string;
  name: string
}


export class CreateCart {
  private readonly cartRepository: CartRepository;
  private readonly userRepository: IUserRepository;

  constructor(repository: RepositoryCart) {
    {
      this.cartRepository = repository.cartRepository;
      this.userRepository = repository.userRepository;
    }
  }

  async create(cart: CartData) {
    try {
      const user = await this.userRepository.findById(cart.userId);
      if (!user) {
        throw new Exception("User not found", StatusCode.BAD_REQUEST);
      }
      const newCart = new Cart({
        name: cart.name,
        userId: cart.userId,
        items: [],
      });

      await this.cartRepository.create(newCart);
      return {
        statusCode: StatusCode.OK,
        body: {
          message: "Cart created with success",
          cart: newCart.id,
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