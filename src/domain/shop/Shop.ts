import { Entity } from "../common/Entity";
import { Product } from "../product/Product";
import { ContentPage } from "./content-shop";


interface IShop {
  id?: string;
  ownerId: string;
  name: string;
  description: string;
  products?: Product[];
  content: ContentPage;
}

export class Shop extends Entity {
  public ownerId: string;
  public name: string;
  public description: string;
  public products: Product[];
  public content: ContentPage;
  constructor(shop: IShop) {
    super();
    this.id = shop.id ? shop.id : this.generateId();
    this.validate(shop);
    this.ownerId = shop.ownerId;
    this.name = shop.name;
    this.description = shop.description;
    this.products = [];
    this.content = shop.content;
  }
  private validate(shop: IShop) {}
}
