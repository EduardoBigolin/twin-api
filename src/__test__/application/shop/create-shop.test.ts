import { describe, expect, test } from "vitest";
import { ShopPrismaRepository } from "../../../adapters/shop/shop-prisma-repository";
import { StoreShop } from "../../../application/shop/store-shop";
import { UserPrismaRepository } from "../../../adapters/user/user-prisma-repository";
import { faker } from "@faker-js/faker";
import { StoreAccount } from "../../../application/user/store-account";
import { VerifyUser } from "../../../application/user/verify-user";

describe("Create shop", async () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const repository = new UserPrismaRepository();

  const newUser = await new StoreAccount(repository).execute({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  await new VerifyUser(repository).execute(newUser.body.response.id);

  test("should return error if user is invalid", async () => {
    const repos = new ShopPrismaRepository();
    const userRepos = new UserPrismaRepository();
    const useCase = await new StoreShop(repos, userRepos).execute({
      ownerId: "Invalid",
      content: {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
      },
      description: faker.lorem.paragraph(),
      name: faker.lorem.words(),
    });
    expect(useCase).toBeDefined();
    expect(useCase).toBeTruthy();
    expect(useCase.statusCode).toBe(400);
    expect(useCase.body.response).toBe("User not found");
  });

  test("create shop", async () => {
    const repos = new ShopPrismaRepository();
    const userRepos = new UserPrismaRepository();

    const useCase = await new StoreShop(repos, userRepos).execute({
      ownerId: newUser.body.response.user.id,
      content: {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
      },
      description: faker.lorem.paragraph(),
      name: faker.lorem.words(),
    });

    expect(useCase).toBeDefined();
    expect(useCase).toBeTruthy();
    expect(useCase.statusCode).toBe(201);
  });
});
