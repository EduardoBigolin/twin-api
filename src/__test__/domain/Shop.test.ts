import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { Shop } from "../../domain/shop/Shop";
import { ContentPage } from "../../domain/shop/content-shop";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/user/User-email";
import { Password } from "../../domain/user/User-password";

describe("Shop", () => {
  const inputUser = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const user = new User({
    name: inputUser.name,
    email: new Email(inputUser.email),
    password: new Password(inputUser.password),
  });
  test("Should create a shop", () => {
    const inputShop = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      content: new ContentPage(
        faker.commerce.productName(),
        faker.commerce.productDescription()
      ),
    };
    const shop = new Shop({
      name: inputShop.name,
      description: inputShop.description,
      content: inputShop.content,
      ownerId: user.id,
    });
  
    expect(shop).toBeTruthy();
    expect(shop).toBeDefined();
    expect(shop.name).toBe(inputShop.name);
    expect(shop.description).toBe(inputShop.description);
    expect(shop.content).toBe(inputShop.content);
    expect(shop.ownerId).toBe(user.id);
  });
});
