import { Entity } from "../common/Entity";
import { Description, Name } from "./product-name";
import { Price } from "./product-price";
import { Quantity } from "./product-quantity";

export interface IProduct {
  id?: string;
  name: Name;
  shopId: string;
  price: Price;
  description: Description;
  photo: string;
  category: string;
  quantity: Quantity;
}

export class Product extends Entity {
  public name: Name;
  public shopId: string;
  public price: Price;
  public description: Description;
  public photo: string;
  public category: string;
  public quantity: Quantity;

  constructor(payLoad: IProduct) {
    super();
    this.id = payLoad.id ? payLoad.id : this.id;
    this.name = payLoad.name;
    this.shopId = payLoad.shopId;
    this.price = payLoad.price;
    this.description = payLoad.description;
    this.photo = payLoad.photo;
    this.category = payLoad.category;
    this.quantity = payLoad.quantity;
  }
}
