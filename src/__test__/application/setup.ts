import { faker } from "@faker-js/faker";
import { UserPrismaRepository } from "../../infrastructure/db/prisma/user-prisma-repository";
import { StoreAccount, VerifyUser } from "../../application/user";
import { StoreShop } from "../../application/shop";
import { ShopPrismaRepository } from "../../infrastructure/db/prisma/shop-prisma-repository";
import { ProductPrismaRepository } from "../../infrastructure/db/prisma/product-prisma-repository";
import { SaveProduct } from "../../application/product";
export class Setup {
  public static async getValidUser() {
    const userRepository = new UserPrismaRepository();
    const input = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const newUser = await new StoreAccount({ userRepository }).execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    await new VerifyUser(userRepository).execute(newUser.body.response.user.id);
    return newUser;
  }
  public static async getProduct() {
    const shopRepository = new ShopPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const productRepository = new ProductPrismaRepository();
    const shop = await this.getShop();

    const product = await new SaveProduct({
      productRepository,
      shopRepository,
      userRepository,
    }).execute({
      userId: shop.user.body.response.user.id,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      shopId: shop.shop.body.response.id,
      quantity: faker.number.int({ min: 1, max: 100 }),
    });

    return product;
  }
  public static async getShop() {
    const shopRepository = new ShopPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const user = await Setup.getValidUser();

    const shop = await new StoreShop({
      shopRepository,
      userRepository,
    }).execute({
      ownerId: user.body.response.user.id,
      content: {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
      },
      description: faker.lorem.paragraph(),
      name: faker.lorem.words(),
    });
    return { shop, user };
  }
}
