import { v4 as uuidv4 } from "uuid";

export class Entity {
  id: string;
  constructor(id?: string) {
    this.id = id ? id : this.generateId();
  }
  generateId() {
    return uuidv4();
  }
}
