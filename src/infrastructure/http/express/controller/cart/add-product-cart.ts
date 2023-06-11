import { Request, Response } from "express";
import { AddProduct } from "../../../../../application/cart/add-product";
import { CartPrismaRepository } from "../../../../db/prisma/cart-prisma-repository";
import { ProductPrismaRepository } from "../../../../db/prisma/product-prisma-repository";

export class AddProductCartController {
  public static async execute(req: Request, res: Response) {
    const { cartId, productId, quantity } = req.body;

    const cartRepository = new CartPrismaRepository();
    const productRepository = new ProductPrismaRepository();

    const useCase = await new AddProduct({
      cartRepository,
      productRepository,
    }).execute({
      cartId: cartId,
      productId: productId,
      quantity: quantity,
    })

    return res.status(useCase.statusCode).json(useCase.body);
  }
}