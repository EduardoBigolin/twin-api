import { PrismaClient } from "@prisma/client";
import { CommentRepository } from "../../../domain/comment/comment-repository";
import { Comment } from "../../../domain/comment/Comment";
import { PrismaRepository } from "./Prisma-repository";

export class CommentPrismaRepository
  extends PrismaRepository
  implements CommentRepository
{
  async create(comment: Comment) {
    const saved = await this.prisma.comment.create({
      data: {
        id: comment.id,
        content: comment.comment,
        productId: comment.productId,
        userId: comment.userId,
      },
    });
    return new Comment({
      comment: saved.content,
      productId: saved.productId,
      userId: saved.userId,
    });
  }
}
