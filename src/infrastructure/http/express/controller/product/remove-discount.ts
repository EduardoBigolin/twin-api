import { Request, Response } from "express";
import { ProductPrismaRepository } from "../../../../../adapters/product/product-prisma-repository";
import { RemoveDiscount } from "../../../../../application/product";

export class RemoveDiscountController {
  public static async execute(req: Request, res: Response) {
    const { productId } = req.body;
    const productRepos = new ProductPrismaRepository();
    const useCase = await new RemoveDiscount(productRepos).execute(productId);
    return res.status(useCase.statusCode).json(useCase.body);
  }
}
