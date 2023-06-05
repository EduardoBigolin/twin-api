import { Exception } from "../common/Exception";
import { StatusCode } from "../common/status-code";

interface IQuantity {
  quantity: number;
}

export class Quantity {
  public quantity: number;
  constructor(payLoad: IQuantity) {
    this.validate(payLoad);
    this.quantity = payLoad.quantity;
  }
  validate(payLoad: IQuantity) {
    if (!payLoad.quantity) {
      throw new Exception("Quantity is required", StatusCode.BAD_REQUEST);
    }
    if (payLoad.quantity < 0) {
      throw new Exception(
        "Quantity cannot be less than 0",
        StatusCode.BAD_REQUEST
      );
    }
  }

  addQuantity(quantity: number) {
    if (quantity < 0) {
      throw new Exception(
        "Quantity cannot be less than 0",
        StatusCode.BAD_REQUEST
      );
    }
    this.quantity += quantity;
  }

  removeQuantity(quantity: number) {
    if (quantity < 0) {
      throw new Exception(
        "Quantity cannot be less than 0",
        StatusCode.BAD_REQUEST
      );
    }
    if (quantity > this.quantity) {
      throw new Exception(
        "Quantity cannot be more than available quantity",
        StatusCode.BAD_REQUEST
      );
    }
    this.quantity -= quantity;
  }
}
