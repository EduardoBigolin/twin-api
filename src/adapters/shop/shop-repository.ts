import { Shop } from "../../domain/shop/Shop";

export interface IShopRepository {
  create(shop: Shop): Promise<void>;
  update(shop: Shop): Promise<Shop>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Shop>;
}
