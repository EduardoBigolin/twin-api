import { PrismaClient } from "@prisma/client";
import { Shop } from "../../../domain/shop/Shop";
import { ContentPage } from "../../../domain/shop/content-shop";
import { IShopRepository } from "../../../domain/shop/shop-repository";
import { PrismaRepository } from "./Prisma-repository";

export class ShopPrismaRepository
  extends PrismaRepository
  implements IShopRepository
{
    constructor() {
    super();
  }

  async create(shop: Shop): Promise<Shop> {
    const SavedShop = await this.prisma.shop.create({
      data: {
        name: shop.name,
        description: shop.description,
        content: JSON.stringify(shop.content),
        userId: shop.ownerId,
      },
    });

    return new Shop({
      id: SavedShop.id,
      name: SavedShop.name,
      description: SavedShop.description,
      content: new ContentPage(
        JSON.parse(SavedShop.content).title as string,
        JSON.parse(SavedShop.content).content as string
      ),
      ownerId: SavedShop.userId,
    });
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
    if (!shop) return null;
    return new Shop({
      id: shop.id,
      name: shop.name,
      description: shop.description,
      content: JSON.parse(shop.content),
      ownerId: shop.userId,
    });
  }
}
