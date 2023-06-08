import { Request, Response } from "express";
import { ApplyDiscount } from "../../../../../application/product/apply-discount";
import { ProductPrismaRepository } from "../../../../../adapters/product/product-prisma-repository";

export class ApplyDiscountController {
  public static async execute(req: Request, res: Response) {
    const { productId, discount } = req.body;
    const productRepos = new ProductPrismaRepository();
    const useCase = await new ApplyDiscount(productRepos).execute({
      productId,
      discount,
    });
    return res.status(useCase.statusCode).json(useCase.body);
  }
}
