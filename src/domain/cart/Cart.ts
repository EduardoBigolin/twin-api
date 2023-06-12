import { Entity } from "../common/Entity";

interface IItensCart {
  id: string;
  quantity: number;
}

interface ICart {
  id?: string;
  userId: string;
  items: IItensCart[];
  name: string;
}

export class Cart extends Entity {
  userId: string;
  items: IItensCart[];
  name: string;
  constructor(data: ICart) {
    super();
    this.userId = data.userId;
    this.items = [];
    this.name = data.name;
    this.id = data.id ? data.id : this.id;
  }
  addProduct(id: string, quantity: number) {
    if (this.items.find((item) => item.id === id)) {
      this.items = this.items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      return;
    }
    this.items.push({ id, quantity });
  }
  removeProduct(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
