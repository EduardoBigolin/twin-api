import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { Product } from "../../domain/product/Product";
import { Description, Name } from "../../domain/product/product-name";
import { Price } from "../../domain/product/product-price";
import { Quantity } from "../../domain/product/product-quantity";
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

  // test("Should return error if owner is don't have token", async () => {
  //   const inputProduct = {
  //     name: faker.commerce.productName(),
  //     seller: user,
  //     price: parseFloat(faker.commerce.price()),
  //     description: faker.commerce.productDescription(),
  //     photo: faker.image.imageUrl(),
  //     category: faker.commerce.department(),
  //     quantity: faker.datatype.number(),
  //   };

  //   const productA = new Product({
  //     name: new Name(inputProduct.name),
  //     seller: inputProduct.seller,
  //     price: new Price({ price: inputProduct.price, discount: 10 }),
  //     description: new Description(inputProduct.description),
  //     photo: inputProduct.photo,
  //     category: inputProduct.category,
  //     quantity: new Quantity({ quantity: inputProduct.quantity }),
  //   });

  //   const productB = new Product({
  //     name: new Name(inputProduct.name),
  //     seller: inputProduct.seller,
  //     price: new Price({ price: inputProduct.price, discount: 10 }),
  //     description: new Description(inputProduct.description),
  //     photo: inputProduct.photo,
  //     category: inputProduct.category,
  //     quantity: new Quantity({ quantity: inputProduct.quantity }),
  //   });

  //   const shopInput = {
  //     owner: user,
  //     name: faker.word.words(),
  //     description: faker.lorem.paragraph(),
  //     products: [productA, productB],
  //     content: new ContentPage(faker.lorem.words(), faker.lorem.paragraph()),
  //   };

  //   expect(
  //     () =>
  //       new Shop({
  //         owner: shopInput.owner,
  //         name: shopInput.name,
  //         description: shopInput.description,
  //         products: shopInput.products,
  //         content: shopInput.content,
  //       })
  //   ).toThrow("You must be authenticated to create a shop");
  // });
});
