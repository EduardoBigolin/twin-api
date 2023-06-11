import { Request, Response } from "express";
import { StoreShop } from "../../../../../application/shop";
import { ShopPrismaRepository } from "../../../../db/prisma/shop-prisma-repository";
import { UserPrismaRepository } from "../../../../db/prisma/user-prisma-repository";

export class CreateShopController {
  static async execute(req: Request, res: Response) {
    const { name, description, content, title } = req.body;

    const ownerId = req.user.id;

    const shopRepository = new ShopPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const useCase = await new StoreShop({
      shopRepository,
      userRepository,
    }).execute({
      ownerId,
      name,
      description,
      content: {
        title,
        content,
      },
    });

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
