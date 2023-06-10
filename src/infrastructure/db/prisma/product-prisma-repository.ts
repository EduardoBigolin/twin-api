import { PrismaClient } from "@prisma/client";
import { Exception } from "../../../domain/common/Exception";
import { StatusCode } from "../../../domain/common/status-code";
import { Product } from "../../../domain/product/Product";
import { ProductRepository } from "../../../domain/product/product-repository";

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
          discount: product.price.discount ? product.price.discount : 0,
        },
      });
    } catch (error) {
      throw new Exception("Server Error", StatusCode.INTERNAL_SERVER);
    }
  }
  async update(product: Product): Promise<Product> {
    const productSaved = await this.prisma.product.update({
      where: { id: product.id },
      data: {
        name: product.name.name,
        description: product.description.description,
        price: product.price.price,
        discount: product.price.discount ? product.price.discount : 0,
        quantity: product.quantity.quantity,
      },
    });
    return new Product({
      description: productSaved.description,
      id: productSaved.id,
      name: productSaved.name,
      price: productSaved.price,
      discount: productSaved.discount,
      quantity: productSaved.quantity,
      shopId: productSaved.shopId,
    });
  }
  delete(product: Product): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) return null;
    return new Product({
      description: product.description,
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      quantity: product.quantity,
      shopId: product.shopId,
    });
  }
}
