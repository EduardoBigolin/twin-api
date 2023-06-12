import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Cart } from "../../domain/cart/Cart";
import { Product } from "../../domain/product/Product";
import { User } from "../../domain/user/User";

describe("Cart", () => {
  it("should be able to create a new cart", () => {
    const user = new User({
      name: "John Doe",
      email: "john@doe.com",
      password: faker.internet.password(),
    });
    const product = new Product({
      name: "Product 1",
      price: 100,
      quantity: 10,
      description: "Product 1 description",
      shopId: "shopId",
      category: "categoryId",
    });
    const cart = new Cart({
      items: [],
      name: "Cart 1",
      userId: user.id,
    });
    cart.addProduct(product.id, 1);

    expect(cart.items.length).toBe(1);
    expect(cart.items[0].id).toBe(product.id);
    expect(cart.items[0].quantity).toBe(1);
  });

  it("should be able to create a new cart with 2 quantity if add product equal ", () => {
    const user = new User({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const product = new Product({
      name: faker.commerce.productName(),
      price: 100,
      quantity: 10,
      description: faker.commerce.productDescription(),
      shopId: "TEST-ID-SHOP",
      category: faker.commerce.department(),
    });
    const product2 = new Product({
      name: faker.commerce.productName(),
      price: 100,
      quantity: 10,
      description: faker.commerce.productDescription(),
      shopId: "TEST-ID-SHOP",
      category: faker.commerce.department(),
    });
    const cart = new Cart({
      name: "Cart 1",
      userId: user.id,
      items: [],
    });

    cart.addProduct(product.id, 1);
    cart.addProduct(product.id, 5);

    cart.addProduct(product2.id, 4);


    expect(cart.items.length).toBe(2);
    expect(cart.items[0].id).toBe(product.id);
    expect(cart.items[0].quantity).toBe(5);
    expect(cart.items[1].quantity).toBe(4);
  });
});
