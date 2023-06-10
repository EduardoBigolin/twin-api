import { Request, Response } from "express";
import { RemoveDiscount } from "../../../../../application/product";
import { ProductPrismaRepository } from "../../../../db/prisma/product-prisma-repository";

export class RemoveDiscountController {
  public static async execute(req: Request, res: Response) {
    const { productId } = req.body;
    const productRepos = new ProductPrismaRepository();
    const useCase = await new RemoveDiscount(productRepos).execute(productId);
    return res.status(useCase.statusCode).json(useCase.body);
  }
}
