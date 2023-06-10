import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { SaveProduct } from "../../../application/product/add-product";
import { ApplyDiscount } from "../../../application/product/apply-discount";
import { StoreShop } from "../../../application/shop/store-shop";
import { StoreAccount } from "../../../application/user/store-account";
import { VerifyUser } from "../../../application/user/verify-user";
import { ProductPrismaRepository } from "../../../infrastructure/db/prisma/product-prisma-repository";
import { ShopPrismaRepository } from "../../../infrastructure/db/prisma/shop-prisma-repository";
import { UserPrismaRepository } from "../../../infrastructure/db/prisma/user-prisma-repository";

describe("Apply discount", async () => {
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

  const shop = await new StoreShop({ shopRepository, userRepository }).execute({
    ownerId: newUser.body.response.user.id,
    content: {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
    },
    description: faker.lorem.paragraph(),
    name: faker.lorem.words(),
  });
  await new VerifyUser(userRepository).execute(newUser.body.response.id);

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

  test("Apply discount with all data is valid", async () => {
    const repository = new ProductPrismaRepository();
    const discount = faker.number.float({ min: 0, max: 100 });
    const useCase = await new ApplyDiscount(repository).execute({
      productId: product.body.product as string,
      discount: discount,
    });

    expect(useCase.statusCode).toBe(200);
    expect(useCase.body.response).toBe("Discount applied with success");
  });

  test("should return error if discount is higher 100", async () => {
    const repository = new ProductPrismaRepository();
    const discount = 101;
    const useCase = await new ApplyDiscount(repository).execute({
      productId: product.body.product as string,
      discount: discount,
    });

    expect(useCase.statusCode).toBe(400);
    expect(useCase.body.response).toBe(
      "Discount cannot be more than 100% or less than 0%"
    );
  });
});
