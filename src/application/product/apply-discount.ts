import { ProductRepository } from "../../adapters/product/product-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";

interface Discount {
  productId: string;
  discount: number;
}

export class ApplyDiscount {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(data: Discount) {
    try {
      const product = await this.productRepository.getById(data.productId);
      if (!product)
        throw new Exception("Product not found", StatusCode.NOT_FOUND);

      product.price.applyDiscount(data.discount);

      const result = await this.productRepository.update(product);
      console.log(result);

      return {
        statusCode: StatusCode.OK,
        body: { response: "Discount applied with success" },
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}
