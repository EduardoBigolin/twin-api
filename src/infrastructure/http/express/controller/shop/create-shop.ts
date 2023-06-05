import { Request, Response } from "express";
import { ShopPrismaRepository } from "../../../../../adapters/shop/shop-prisma-repository";
import { StoreShop } from "../../../../../application/shop/store-shop";
import { UserPrismaRepository } from "../../../../../adapters/user/user-prisma-repository";

export class CreateShopController {
  static async execute(req: Request, res: Response) {
    const { name, description, content, title } = req.body;

    const ownerId = req.user.id;

    const repository = new ShopPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const useCase = await new StoreShop(repository, userRepository).execute({
      ownerId: ownerId,
      name: name,
      description: description,
      content: {
        title: title,
        content: content,
      },
    });

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
