import { validate } from "uuid";
import { Entity } from "../common/Entity";
import { Exception, StatusCode } from "../common/Exception";
import { Product } from "../product/Product";
import { User } from "../user/User";
import { ContentPage } from "./content-shop";

interface IShop {
  owner: User;
  name: string;
  description: string;
  products?: Product[];
  content: ContentPage;
}

export class Shop extends Entity {
  public owner: User;
  public name: string;
  public description: string;
  public products: Product[];
  public content: ContentPage;
  constructor(shop: IShop) {
    super();
    this.validate(shop);
    this.owner = shop.owner;
    this.name = shop.name;
    this.description = shop.description;
    this.products = [];
    this.content = shop.content;
  }
  private validate(shop: IShop) {}

  public addProduct(product: Product) {
    if (!this.owner.isAuthenticated)
      new Exception(
        "You must be authenticated to add a product to your shop",
        StatusCode.UNAUTHORIZED
      );
    this.products.push(product);
  }

  public removeProduct(product: Product) {
    new Exception(
      "You must be authenticated to add a product to your shop",
      StatusCode.UNAUTHORIZED
    );
    this.products = this.products.filter((p) => p.id !== product.id);
  }
}
