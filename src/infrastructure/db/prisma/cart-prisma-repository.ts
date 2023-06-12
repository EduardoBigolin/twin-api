import { randomUUID } from "crypto";
import { Cart } from "../../../domain/cart/Cart";
import { CartRepository } from "../../../domain/cart/cart-repository";
import { PrismaRepository } from "./Prisma-repository";

export class CartPrismaRepository
  extends PrismaRepository
  implements CartRepository {
  async findById(id: string): Promise<Cart | null> {

    const cart = await this.prisma.cart.findUnique({
      where: {
        id: id,
      },
      include: {
        Cart_Item: true,
      },
    });
    if (!cart) {
      return null;
    }

    const card = new Cart({
      id: cart.id,
      name: cart.name,
      userId: cart.userId,
      items: [],
    })
    for (const item of cart.Cart_Item) {
      console.log(item);

      card.addProduct(item.productId, item.quantity);
    }
    console.log(card);

    return card;
  }

  async create(data: Cart): Promise<void> {

    await this.prisma.cart.upsert({
      where: {
        id: data.id,
      },
      update: {
        name: data.name,
        userId: data.userId,
        Cart_Item: {
          updateMany: await Promise.all(data.items.map(async (item) => {
            return {
              where: {
                productId: item.id,
              },
              data: {
                quantity: item.quantity,
              },
            };
          })),
          create: await Promise.all(data.items.filter((item) => {
            return !item.id; // Filtra itens que não possuem um ID
          }).map(async (item) => {
            return {
              productId: item.id,
              quantity: item.quantity,
            };
          }))
        }
      },
      create: {
        id: data.id,
        name: data.name,
        userId: data.userId,
      },
    });


  }

  async addProduct(cart: Cart): Promise<void> {
  }
  removeProduct(cartId: string, productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
