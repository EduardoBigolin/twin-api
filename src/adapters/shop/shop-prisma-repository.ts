import { PrismaClient } from "@prisma/client";
import { Shop } from "../../domain/shop/Shop";
import { IShopRepository } from "./shop-repository";

export class ShopPrismaRepository implements IShopRepository {
  private prisma = new PrismaClient();

  async create(shop: Shop): Promise<void> {
    await this.prisma.shop.create({
      data: {
        id: shop.id,
        name: shop.name,
        description: shop.description,
        content: JSON.stringify(shop.content),
        userId: shop.owner.getId(),
      },
    });
  }
  async update(shop: Shop): Promise<Shop> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Shop> {
    throw new Error("Method not implemented.");
  }
}
