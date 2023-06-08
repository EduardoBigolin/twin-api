import { Entity } from "../common/Entity";
import { Exception } from "../common/Exception";
import { StatusCode } from "../common/status-code";
import { Email } from "./User-email";
import { Password } from "./User-password";
import { Token } from "./User-token";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  isAuthenticated?: boolean;
}

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
    this.email = new Email(payLoad.email);
    this.password = new Password(payLoad.password);
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
