import { ProductRepository } from "../../adapters/product/product-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";

export class RemoveDiscount {
  private productRepository: ProductRepository;
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: string) {
    try {
      const product = await this.productRepository.getById(productId);

      if (!product)
        throw new Exception("Product not found", StatusCode.BAD_REQUEST);

      product.price.removeDiscount();

      await this.productRepository.update(product);

      return {
        statusCode: StatusCode.OK,
        body: { response: "Discount removed with success" },
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}
