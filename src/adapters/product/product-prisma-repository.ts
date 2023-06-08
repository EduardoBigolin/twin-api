import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "./product-repository";
import { Exception } from "../../domain/common/Exception";
import { Product } from "../../domain/product/Product";
import { StatusCode } from "../../domain/common/status-code";
import { Description, Name } from "../../domain/product/product-name";
import { Price } from "../../domain/product/product-price";
import { Quantity } from "../../domain/product/product-quantity";

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
      description: new Description(productSaved.description),
      id: productSaved.id,
      name: new Name(productSaved.name),
      price: new Price({
        price: productSaved.price,
        discount: productSaved.discount,
      }),
      quantity: new Quantity({ quantity: productSaved.quantity }),
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
      description: new Description(product.description),
      id: product.id,
      name: new Name(product.name),
      price: new Price({
        price: product.price,
        discount: product.discount,
      }),

      quantity: new Quantity({ quantity: product.quantity }),
      shopId: product.shopId,
    });
  }
}
