import { Jwt } from "../../infrastructure/utils/jwt";

export interface userPayLoad {
  id: string;
  name: string;
  email: string;
}

export class Token {
  public token: string;
  constructor(payLoad: userPayLoad) {
    this.token = Jwt.generateToken(payLoad);
  }
  getToken() {
    return this.token;
  }
}
