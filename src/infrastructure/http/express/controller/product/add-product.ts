import { Request, Response } from "express";
import { ProductPrismaRepository } from "../../../../../adapters/product/product-prisma-repository";
import { ShopPrismaRepository } from "../../../../../adapters/shop/shop-prisma-repository";
import { SaveProduct } from "../../../../../application/product/add-product";

export class AddProductController {
  static async execute(req: Request, res: Response) {
    const { name, description, price, quantity, category, photo } = req.body;
    const { shopId } = req.params;
    // const { id } = req.user;

    const repository = new ProductPrismaRepository();
    const shopRepository = new ShopPrismaRepository();
    const useCase = await new SaveProduct(repository, shopRepository).execute({
      name: name,
      description: description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category: category,
      photo: photo,
      shopId: shopId,
    });

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
