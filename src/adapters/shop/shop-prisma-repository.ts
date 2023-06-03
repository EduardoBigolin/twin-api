import { PrismaClient, Product } from "@prisma/client";
import { Shop } from "../../domain/shop/Shop";
import { IShopRepository } from "./shop-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";

export class ShopPrismaRepository implements IShopRepository {
  private prisma = new PrismaClient();

  async create(shop: Shop): Promise<Shop> {
    try {
      await this.prisma.shop.create({
        data: {
          id: shop.id,
          name: shop.name,
          description: shop.description,
          content: JSON.stringify(shop.content),
          userId: shop.ownerId,
        },
      });
      return new Shop({
        id: shop.id,
        name: shop.name,
        description: shop.description,
        content: shop.content,
        ownerId: shop.ownerId,
      });
    } catch (error: any) {
      throw new Exception(error.message, StatusCode.INTERNAL_SERVER);
    }
  }
  async update(shop: Shop): Promise<Shop> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Shop | null> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });
    if (!shop) throw new Error("Shop not found");
    return new Shop({
      id: shop.id,
      name: shop.name,
      description: shop.description,
      content: JSON.parse(shop.content),
      ownerId: shop.userId,
    });
  }
}
