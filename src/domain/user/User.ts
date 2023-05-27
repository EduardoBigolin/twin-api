import { Entity } from "../common/Entity";
import { Email } from "./User-email";
import { IUser } from "./User-interface";
import { Password } from "./User-password";
import { Token } from "./User-token";

export class User extends Entity {
  public name: string;
  public email: Email;
  public password: Password;
  public token?: Token;

  constructor(payLoad: IUser) {
    super();
    this.id = payLoad.id ? payLoad.id : this.id;
    this.name = payLoad.name;
    this.email = payLoad.email;
    this.password = payLoad.password;
  }

  public async getToken() {
    this.token = new Token({
      id: this.id,
      name: this.name,
      email: this.email.getEmail(),
    });
    return this.token.getToken();
  }

  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
}
