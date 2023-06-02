import { test } from "vitest";
import { ShopPrismaRepository } from "../../../adapters/shop/shop-prisma-repository";
import { StoreShop } from "../../../application/shop/store-shop";
import { UserPrismaRepository } from "../../../adapters/user/user-prisma-repository";
import { faker } from "@faker-js/faker";

test("create shop", async () => {
  const repos = new ShopPrismaRepository();
  const userRepos = new UserPrismaRepository();
  const useCase = await new StoreShop(repos, userRepos).execute({
    ownerId: "fdce36b1-e017-4967-8e38-da5f9ca071df",
    content: {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
    },
    description: faker.lorem.paragraph(),
    name: faker.lorem.words(),
  });
  console.log(useCase);
});
