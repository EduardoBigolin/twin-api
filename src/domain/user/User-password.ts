import { Exception } from "../common/Exception";
import { StatusCode } from "../common/status-code";
import { Hash } from "../utils/hash";

export class Password {
  private password: string;

  constructor(password: string) {
    this.validate(password);
    this.password = password;
  }
  async hashPassword(): Promise<string> {
    const passwordHash = await Hash.getHash(this.password);
    this.password = passwordHash;
    return passwordHash;
  }
  async comparePassword(password: string): Promise<boolean> {
    return await Hash.compareHash(password, this.password);
  }
  public validate(password: string) {
    if (!password) {
      throw new Exception("Password is required", StatusCode.BAD_REQUEST);
    }

    if (password.length < 8) {
      throw new Exception("Invalid password", StatusCode.BAD_REQUEST);
    }
  }
}
