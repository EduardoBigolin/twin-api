import { PrismaClient } from "@prisma/client";
import { UserModel } from "./mongodb/schemas/User";
import { ProductModel } from "./mongodb/schemas/Product";
import { ShopModel } from "./mongodb/schemas/Shop";

export class DataSync {
  private prisma = new PrismaClient();
  private syncedUserIds: Set<string> = new Set();
  private syncedProductIds: Set<string> = new Set();
  private syncedShopIds: Set<string> = new Set();

  async syncData() {
    try {
      const shops = await this.prisma.shop.findMany();

      const newShops = shops.filter(
        (product) => !this.syncedShopIds.has(product.id)
      );
      this.syncedProductIds = new Set([
        ...this.syncedProductIds,
        ...newShops.map((product) => product.id),
      ]);

      if (newShops.length > 0) {
        await ShopModel.insertMany(newShops);

        console.log(
          `Inserted ${newShops.length} new Shops records into the SQL database.`
        );
      }

      const users = await this.prisma.user.findMany();

      const newUsers = users.filter((user) => !this.syncedUserIds.has(user.id));
      this.syncedUserIds = new Set([
        ...this.syncedUserIds,
        ...newUsers.map((user) => user.id),
      ]);

      if (newUsers.length > 0) {
        await UserModel.insertMany(newUsers);
        console.log(
          `Inserted ${newUsers.length} new user records into the NoSQL database.`
        );
      }

      const products = await this.prisma.product.findMany();

      const newProducts = products.filter(
        (product) => !this.syncedProductIds.has(product.id)
      );
      this.syncedProductIds = new Set([
        ...this.syncedProductIds,
        ...newProducts.map((product) => product.id),
      ]);

      if (newProducts.length > 0) {
        await ProductModel.insertMany(newProducts);
        console.log(
          `Inserted ${newProducts.length} new product records into the NoSQL database.`
        );
      }

      console.log("Data synchronization completed.");
    } catch (error) {
      console.error(error);
    }
  }

  startSync() {
    setInterval(async () => {
      await this.syncData();
    }, 3000); // Update every 60000 minute
  }
}

const dataSync = new DataSync();
dataSync.startSync();
