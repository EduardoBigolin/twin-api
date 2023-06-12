import { Cart } from "./Cart";

export interface CartRepository {
  create(cart: Cart): Promise<void>;
  addProduct(cart: Cart): Promise<void>;
  removeProduct(cartId: string, productId: string): Promise<void>;
  findById(id: string): Promise<Cart | null>;
}
