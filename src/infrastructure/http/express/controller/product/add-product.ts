import { Request, Response } from "express";
import { ProductPrismaRepository } from "../../../../../adapters/product/product-prisma-repository";
import { ShopPrismaRepository } from "../../../../../adapters/shop/shop-prisma-repository";
import { SaveProduct } from "../../../../../application/product/add-product";
import { UserPrismaRepository } from "../../../../../adapters/user/user-prisma-repository";

export class AddProductController {
  static async execute(req: Request, res: Response) {
    const { name, description, price, quantity, category, photo } = req.body;
    const { shopId } = req.params;
    const { id } = req.user;

    const repository = new ProductPrismaRepository();
    const shopRepository = new ShopPrismaRepository();
    const userRepository = new UserPrismaRepository();
    console.time();
    const useCase = await new SaveProduct(
      repository,
      shopRepository,
      userRepository
    ).execute({
      name: name,
      description: description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category: category,
      photo: photo,
      shopId: shopId,
      userId: id,
    });
    console.timeEnd();
    return res.status(useCase.statusCode).json(useCase.body);
  }
}
