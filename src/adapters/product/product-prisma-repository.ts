import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "./product-repository";
import { Exception } from "../../domain/common/Exception";
import { Product } from "../../domain/product/Product";
import { StatusCode } from "../../domain/common/status-code";

export class ProductPrismaRepository implements ProductRepository {
  private prisma = new PrismaClient();
  async create(product: Product): Promise<void> {
    try {
      await this.prisma.product.create({
        data: {
          id: product.id,
          name: product.name.name,
          description: product.description.description,
          price: product.price.price,
          quantity: product.quantity.quantity,
          shopId: product.shopId,
        },
      });
    } catch (error) {
      console.log(error);

      throw new Exception("Server Error", StatusCode.INTERNAL_SERVER);
    }
  }
  update(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(product: Product): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
