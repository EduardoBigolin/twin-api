import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { StoreShop } from "../../../application/shop/store-shop";
import { StoreAccount, VerifyUser } from "../../../application/user";
import { ShopPrismaRepository } from "../../../infrastructure/db/prisma/shop-prisma-repository";
import { UserPrismaRepository } from "../../../infrastructure/db/prisma/user-prisma-repository";

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

  await new VerifyUser(userRepository).execute(newUser.body.response.user.id);

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
    console.log(useCase);
    
    // expect(useCase).toBeDefined();
    // expect(useCase).toBeTruthy();
    // expect(useCase.statusCode).toBe(400);
    // expect(useCase.body).toBe("User not found");
  });

  test("create shop", async () => {
    console.log(newUser.body.response.user.id);
    
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
