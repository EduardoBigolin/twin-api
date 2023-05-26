import { Entity } from "../common/Entity";
import { Email } from "./User-email";
import { IUser } from "./User-interface";
import { Password } from "./User-password";

export class User extends Entity {
  public name: string;
  public email: Email;
  public password: Password;
  constructor(payLoad: IUser) {
    super();
    this.id = payLoad.id ? payLoad.id : this.id;
    this.name = payLoad.name;
    this.email = payLoad.email;
    this.password = payLoad.password;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
}
