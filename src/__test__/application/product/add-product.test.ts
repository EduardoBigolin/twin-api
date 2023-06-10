import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { SaveProduct } from "../../../application/product";
import { StoreShop } from "../../../application/shop";
import { StoreAccount, VerifyUser } from "../../../application/user";
import { ShopPrismaRepository } from "../../../infrastructure/db/prisma/shop-prisma-repository";
import { UserPrismaRepository } from "../../../infrastructure/db/prisma/user-prisma-repository";
import { ProductPrismaRepository } from "../../../infrastructure/db/prisma/product-prisma-repository";

describe("Shop", async () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const shopRepository = new ShopPrismaRepository();
  const userRepository = new UserPrismaRepository();

  const newUser = await new StoreAccount({ userRepository }).execute({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  await new VerifyUser(userRepository).execute(newUser.body.response.id);

  test("Should add product on the shop", async () => {
    const shop = await new StoreShop({
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

    const inputProduct = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      shopId: shop.body.response.id,
      quantity: faker.number.int({ min: 1, max: 100 }),
    };
    const productRepository = new ProductPrismaRepository();

    const product = await new SaveProduct({
      productRepository,
      shopRepository,
      userRepository,
    }).execute({
      userId: newUser.body.response.user.id,
      name: inputProduct.name,
      description: inputProduct.description,
      price: inputProduct.price,
      shopId: shop.body.response.id,
      quantity: inputProduct.quantity,
    });

    expect(product).toBeDefined();
    expect(product).toBeTruthy();
    expect(product.statusCode).toBe(200);
    expect(product.body.message).toBe("Product created with success");
  });
});
