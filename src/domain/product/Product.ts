import { Entity } from "../common/Entity";
import { Description, Name } from "./product-name";
import { Price } from "./product-price";
import { Quantity } from "./product-quantity";

export interface IProduct {
  id?: string;
  name: string;
  shopId: string;
  price: number;
  description: string;
  photo?: string;
  category?: string;
  quantity: number;
  discount?: number;
}

export class Product extends Entity {
  public name: Name;
  public shopId: string;
  public price: Price;
  public description: Description;
  public photo?: string;
  public category?: string;
  public quantity: Quantity;

  constructor(payLoad: IProduct) {
    super();
    this.id = payLoad.id ? payLoad.id : this.id;
    this.name = new Name(payLoad.name);
    this.shopId = payLoad.shopId;
    this.price = new Price({
      price: payLoad.price,
      discount: payLoad.discount ? payLoad.discount : 0,
    });
    this.description = new Description(payLoad.description);
    this.photo = payLoad.photo;
    this.category = payLoad.category;
    this.quantity = new Quantity({ quantity: payLoad.quantity });
  }
}
