import { describe, expect, it } from "vitest";
import { AddProduct } from "../../../application/cart/add-product";
import { CreateCart } from "../../../application/cart/create-cart";
import { CartPrismaRepository } from "../../../infrastructure/db/prisma/cart-prisma-repository";
import { ProductPrismaRepository } from "../../../infrastructure/db/prisma/product-prisma-repository";
import { UserPrismaRepository } from "../../../infrastructure/db/prisma/user-prisma-repository";
import { Setup } from "../setup";

describe("Add product Cart", async () => {
  const cartRepository = new CartPrismaRepository();
  const userRepository = new UserPrismaRepository();
  const productRepository = new ProductPrismaRepository();

  const user = await Setup.getValidUser();
  const createCart = await new CreateCart({
    cartRepository,
    userRepository,
    productRepository
  }).create({
    userId: user.body.response.user.id as string,
    name: "basic cart"
  })
  it("should add product to cart", async () => {
    const cart = createCart.body.cart as string;
    const product = await Setup.getProduct();

    const addProduct = await new AddProduct({
      cartRepository,
      productRepository
    }).execute({
      cartId: cart,
      productId: product.body.product as string,
      quantity: 1
    });


    expect(addProduct.statusCode).toBe(200);
    expect(addProduct.body.message).toBe("Product added with success");
  });

  it("should add product to cart with 2 products", async () => {
    const cart = createCart.body.cart as string;
    const product = await Setup.getProduct();

    const addProduct = await new AddProduct({
      cartRepository,
      productRepository
    }).execute({
      cartId: cart,
      productId: product.body.product as string,
      quantity: 1
    });

    const addProduct2 = await new AddProduct({
      cartRepository,
      productRepository
    }).execute({
      cartId: cart,
      productId: product.body.product as string,
      quantity: 10
    });



    expect(addProduct.statusCode).toBe(200);
    expect(addProduct.body.message).toBe("Product added with success");
  });
});
