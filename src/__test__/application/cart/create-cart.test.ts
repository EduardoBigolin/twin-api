import { describe, expect, it } from "vitest";
import { CreateCart } from "../../../application/cart/create-cart";
import { CartPrismaRepository } from "../../../infrastructure/db/prisma/cart-prisma-repository";
import { ProductPrismaRepository } from "../../../infrastructure/db/prisma/product-prisma-repository";
import { UserPrismaRepository } from "../../../infrastructure/db/prisma/user-prisma-repository";
import { Setup } from "../setup";

describe("create-cart", () => {
  it("should create a cart", async () => {

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

    expect(createCart.statusCode).toBe(200);
    expect(createCart.body.message).toBe("Cart created with success");
  }
  );

  it("should return error if user is invalid", async () => {

    const cartRepository = new CartPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const productRepository = new ProductPrismaRepository();

    const createCart = await new CreateCart({
      cartRepository,
      userRepository,
      productRepository
    }).create({
      userId: "invalid-user-id",
      name: "basic cart"
    })

    expect(createCart.statusCode).toBe(400);
    expect(createCart.body.response).toBe("User not found");
  }
  );
})