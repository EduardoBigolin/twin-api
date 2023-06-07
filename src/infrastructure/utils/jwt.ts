import jwt from "jsonwebtoken";
import { environment } from "../../config/environments";
import { userPayLoad } from "../../domain/user/User-token";

export class Jwt {
  public static generateToken(payLoad: userPayLoad) {
    return jwt.sign(payLoad, environment.jwtSecret, {
      expiresIn: environment.jwtExpiresIn,
    });
  }
  public static verifyToken(token: string) {
    const decoded = jwt.verify(token, environment.jwtSecret);
    return decoded;
  }
}
