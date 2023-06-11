import { CartRepository } from "../../domain/cart/cart-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { ProductRepository } from "../../domain/product/product-repository";

interface AddProductRepository {
  readonly cartRepository: CartRepository;
  readonly productRepository: ProductRepository;
}
interface AddProductData {
  productId: string;
  cartId: string;
  quantity: number;
}

export class AddProduct {
  private readonly cartRepository;
  private readonly productRepository;

  constructor(repository: AddProductRepository) {
    this.cartRepository = repository.cartRepository;
    this.productRepository = repository.productRepository;
  }
  async execute(product: AddProductData) {
    try {
      const cart = await this.cartRepository.findById(product.cartId);
      if (!cart) {
        throw new Exception("Cart not found", StatusCode.BAD_REQUEST);
      }
      const productFound = await this.productRepository.getById(product.productId);
      if (!productFound) {
        throw new Exception("Product not found", StatusCode.BAD_REQUEST);
      }

      if (productFound.quantity.quantity < product.quantity) {
        throw new Exception("Quantity is greater than stock", StatusCode.BAD_REQUEST);
      }

      cart.addProduct(productFound.id, product.quantity);

      await this.cartRepository.create(cart);
      return {
        statusCode: StatusCode.OK,
        body: {
          message: "Product added with success",
        },
      };
    }
    catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}