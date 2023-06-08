import { Exception } from "../common/Exception";
import { StatusCode } from "../common/status-code";

export interface IPrice {
  price: number;
  discount?: number;
}

export class Price {
  public price: number;
  public discount?: number;
  constructor(payLoad: IPrice) {
    this.validate(payLoad);
    this.price = payLoad.price;
    this.discount = payLoad.discount ? payLoad.discount : 0;
  }

  validate(payLoad: IPrice) {
    if (!payLoad.price) {
      throw new Exception("Price is required", StatusCode.BAD_REQUEST);
    }
    if (payLoad.discount) {
      if (payLoad.discount > 100) {
        throw new Exception(
          "Discount cannot be more than 100%",
          StatusCode.BAD_REQUEST
        );
      }
    }
  }

  getDiscountedPrice() {
    if (this.discount) {
      return this.price - (this.price * this.discount) / 100;
    }
    return this.price;
  }

  removeDiscount() {
    this.discount = 0;
  }

  applyDiscount(discount: number) {
    if (discount > 100 || discount < 0) {
      throw new Exception(
        "Discount cannot be more than 100% or less than 0%",
        StatusCode.BAD_REQUEST
      );
    }
    this.discount = discount;
  }
}
