import { expect, test } from "vitest";
import { fa, faker } from "@faker-js/faker";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/user/User-email";
import { Password } from "../../domain/user/User-password";
import { Quantity } from "../../domain/product/product-quantity";
import { Description, Name } from "../../domain/product/product-name";
import { Price } from "../../domain/product/product-price";
import { Product } from "../../domain/product/Product";

test("Create Product with valid data", async () => {
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

  const inputProduct = {
    name: faker.commerce.productName(),
    seller: user,
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    photo: faker.image.imageUrl(),
    category: faker.commerce.department(),
    quantity: faker.datatype.number(),
  };
  const product = new Product({
    name: new Name(inputProduct.name),
    seller: inputProduct.seller,
    price: new Price({ price: inputProduct.price, discount: 10 }),
    description: new Description(inputProduct.description),
    photo: inputProduct.photo,
    category: inputProduct.category,
    quantity: new Quantity({ quantity: inputProduct.quantity }),
  });

  expect(product).toBeTruthy();
  expect(product.name.name).toBe(inputProduct.name);
  expect(product.seller).toBe(inputProduct.seller);
  expect(product.price.price).toBe(inputProduct.price);
  expect(product.description.description).toBe(inputProduct.description);
  expect(product.photo).toBe(inputProduct.photo);
  expect(product.category).toBe(inputProduct.category);
});

test("Should return new error if Product with Invalid description", async () => {
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

  const inputProduct = {
    name: faker.commerce.productName(),
    seller: user,
    price: parseFloat(faker.commerce.price()),
    description: null as any,
    photo: faker.image.imageUrl(),
    category: faker.commerce.department(),
    quantity: faker.datatype.number(),
  };
  expect(() => {
    new Product({
      name: new Name(inputProduct.name),
      seller: inputProduct.seller,
      price: new Price({ price: inputProduct.price, discount: 10 }),
      description: new Description(inputProduct.description),
      photo: inputProduct.photo,
      category: inputProduct.category,
      quantity: new Quantity({ quantity: inputProduct.quantity }),
    });
  }).toThrow("Description is required");
});

test("Should return new error if Product with Invalid discount", async () => {
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

  const inputProduct = {
    name: faker.commerce.productName(),
    seller: user,
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    photo: faker.image.imageUrl(),
    category: faker.commerce.department(),
    quantity: faker.datatype.number(),
  };
  expect(() => {
    new Product({
      name: new Name(inputProduct.name),
      seller: inputProduct.seller,
      price: new Price({ price: inputProduct.price, discount: 110 }),
      description: new Description(inputProduct.description),
      photo: inputProduct.photo,
      category: inputProduct.category,
      quantity: new Quantity({ quantity: inputProduct.quantity }),
    });
  }).toThrow("Discount cannot be more than 100%");
});

test("Should return new error if Product with Invalid discount", async () => {
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

  const inputProduct = {
    name: faker.commerce.productName(),
    seller: user,
    price: 100.0,
    description: faker.commerce.productDescription(),
    photo: faker.image.imageUrl(),
    category: faker.commerce.department(),
    quantity: faker.datatype.number(),
  };
  const newProduct = new Product({
    name: new Name(inputProduct.name),
    seller: inputProduct.seller,
    price: new Price({ price: inputProduct.price, discount: 10 }),
    description: new Description(inputProduct.description),
    photo: inputProduct.photo,
    category: inputProduct.category,
    quantity: new Quantity({ quantity: inputProduct.quantity }),
  });

  expect(newProduct.price.getDiscountedPrice()).toBe(
    inputProduct.price - (inputProduct.price * 10) / 100
  );
});

test("Should return new error if Product with Invalid discount", async () => {
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

  const inputProduct = {
    name: faker.commerce.productName(),
    seller: user,
    price: 100.0,
    description: faker.commerce.productDescription(),
    photo: faker.image.imageUrl(),
    category: faker.commerce.department(),
    quantity: faker.datatype.number(),
  };
  const newProduct = new Product({
    name: new Name(inputProduct.name),
    seller: inputProduct.seller,
    price: new Price({ price: inputProduct.price }),
    description: new Description(inputProduct.description),
    photo: inputProduct.photo,
    category: inputProduct.category,
    quantity: new Quantity({ quantity: inputProduct.quantity }),
  });

  console.log(newProduct.price.getDiscountedPrice());

  expect(newProduct.price.getDiscountedPrice()).toBe(inputProduct.price);
});
