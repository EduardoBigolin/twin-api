import { Request, Response } from "express";
import { ProductPrismaRepository } from "../../../../../adapters/product/product-prisma-repository";
import { ShopPrismaRepository } from "../../../../../adapters/shop/shop-prisma-repository";
import { UserPrismaRepository } from "../../../../../adapters/user/user-prisma-repository";
import { SaveProduct } from "../../../../../application/product";

export class AddProductController {
  static async execute(req: Request, res: Response) {
    const { name, description, price, quantity, category, photo } = req.body;
    const { shopId } = req.params;
    const { id } = req.user;

    const productRepository = new ProductPrismaRepository();
    const shopRepository = new ShopPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const useCase = await new SaveProduct({
      productRepository,
      shopRepository,
      userRepository,
    }).execute({
      name: name,
      description: description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category: category,
      photo: photo,
      shopId: shopId,
      userId: id,
    });
    return res.status(useCase.statusCode).json(useCase.body);
  }
}
