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

  const userRepository = new UserPrismaRepository();

  const newUser = await new StoreAccount({ userRepository }).execute({
    name: input.name,
    email: input.email,
    password: input.password,
  });

  await new VerifyUser(userRepository).execute(newUser.body.response.id);

  test("should return error if user is invalid", async () => {
    const shopRepository = new ShopPrismaRepository();
    const useCase = await new StoreShop({
      shopRepository,
      userRepository,
    }).execute({
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
    const shopRepository = new ShopPrismaRepository();
    const useCase = await new StoreShop({
      shopRepository,
      userRepository,
    }).execute({
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
