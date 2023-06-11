import { Request, Response } from "express";
import { CommentPrismaRepository } from "../../../../db/prisma/comment-prisma-repository";
import { UserPrismaRepository } from "../../../../db/prisma/user-prisma-repository";
import { ProductPrismaRepository } from "../../../../db/prisma/product-prisma-repository";
import { AddComment } from "../../../../../application/comment/add-comment";

export class AddCommentController {
  public static async execute(req: Request, res: Response) {
    const { comment } = req.body;
    const { productId } = req.params;
    const { id } = req.user;

    const commentRepository = new CommentPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const productRepository = new ProductPrismaRepository();

    const useCase = await new AddComment({
      commentRepository,
      userRepository,
      productRepository,
    }).execute({
      userId: id,
      productId,
      comment,
    });

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
