import { Entity } from "../common/Entity";
import { Exception, StatusCode } from "../common/Exception";
import { Email } from "./User-email";
import { IUser } from "./User-interface";
import { Password } from "./User-password";
import { Token } from "./User-token";

export class User extends Entity {
  public name: string;
  public email: Email;
  public password: Password;
  public token?: Token;
  public isAuthenticated: boolean;

  constructor(payLoad: IUser) {
    super();
    this.validate(payLoad);
    this.id = payLoad.id ? payLoad.id : this.id;
    this.name = payLoad.name;
    this.email = payLoad.email;
    this.password = payLoad.password;
    this.isAuthenticated = payLoad.isAuthenticated
      ? payLoad.isAuthenticated
      : false;
  }

  public validate(payLoad: IUser) {
    if (!payLoad.name) {
      throw new Exception("User name is required", StatusCode.BAD_REQUEST);
    }
  }

  public getToken() {
    if (!this.isAuthenticated)
      throw new Exception("User is not authenticated", StatusCode.UNAUTHORIZED);
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
}
