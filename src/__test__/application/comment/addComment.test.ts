import { expect, test } from "vitest";
import { Setup } from "../setup";
import { AddComment } from "../../../application/comment/add-comment";
import { UserPrismaRepository } from "../../../infrastructure/db/prisma/user-prisma-repository";
import { ProductPrismaRepository } from "../../../infrastructure/db/prisma/product-prisma-repository";
import { CommentPrismaRepository } from "../../../infrastructure/db/prisma/comment-prisma-repository";
import { faker } from "@faker-js/faker";
test("comment", async () => {
  const commentRepository = new CommentPrismaRepository();
  const userRepository = new UserPrismaRepository();
  const productRepository = new ProductPrismaRepository();
  const input = {
    userId: (await Setup.getValidUser()).body.response.user.id as string,
    productId: (await Setup.getProduct()).body.product as string,
    comment: faker.lorem.paragraph(),
  };

  const comment = await new AddComment({
    commentRepository,
    userRepository,
    productRepository,
  }).execute(input);

  expect(comment).toBeTruthy();
  expect(comment.statusCode).toBe(200);
  expect(comment.body.message).toBe("Comment created with success");
  expect(comment.body.comment).toBeDefined();
});
