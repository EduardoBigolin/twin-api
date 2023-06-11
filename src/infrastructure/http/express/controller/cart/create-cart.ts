import { Request, Response } from "express";
import { CreateCart } from "../../../../../application/cart/create-cart";
import { ProductPrismaRepository } from "../../../../db/prisma/product-prisma-repository";
import { UserPrismaRepository } from "../../../../db/prisma/user-prisma-repository";
import { CartPrismaRepository } from "../../../../db/prisma/cart-prisma-repository";

export class CreateCartController {
  public static async execute(req: Request, res: Response) {
    const { name } = req.body;
    const { id } = req.user;

    const cartRepository = new CartPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const productRepository = new ProductPrismaRepository();

    const useCase = await new CreateCart({
      cartRepository,
      productRepository,
      userRepository,
    }).create({
      userId: id,
      name: name,
    })

    return res.status(useCase.statusCode).json(useCase.body);
  }
}