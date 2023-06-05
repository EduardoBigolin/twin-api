import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { ProductPrismaRepository } from "../../../adapters/product/product-prisma-repository";
import { ShopPrismaRepository } from "../../../adapters/shop/shop-prisma-repository";
import { UserPrismaRepository } from "../../../adapters/user/user-prisma-repository";
import { SaveProduct } from "../../../application/product/add-product";
import { StoreShop } from "../../../application/shop/store-shop";
import { StoreAccount } from "../../../application/user/store-account";
import { VerifyUser } from "../../../application/user/verify-user";

describe("Shop", async () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const ShopRepos = new ShopPrismaRepository();
  const UserRepos = new UserPrismaRepository();

  const newUser = await new StoreAccount(UserRepos).execute({
    name: input.name,
    email: input.email,
    password: input.password,
  });

  const repos = new ShopPrismaRepository();
  const userRepos = new UserPrismaRepository();

  const shop = await new StoreShop(repos, userRepos).execute({
    ownerId: newUser.body.response.user.id,
    content: {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
    },
    description: faker.lorem.paragraph(),
    name: faker.lorem.words(),
  });
  await new VerifyUser(UserRepos).execute(newUser.body.response.id);

  test("Should add product on the shop", async () => {
    const shop = await new StoreShop(ShopRepos, UserRepos).execute({
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
    const productRepos = new ProductPrismaRepository();

    const product = await new SaveProduct(productRepos, ShopRepos).execute({
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
