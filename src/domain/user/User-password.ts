import { Exaction } from "../common/Exaction";
import { Hash } from "../utils/hash";

export class Password {
  private password: string;

  constructor(password: string) {
    this.validate(password);
    this.password = password;
  }
  async hashPassword(): Promise<string> {
    return await Hash.getHash(this.password);
  }
  async comparePassword(hash: string): Promise<boolean> {
    return await Hash.compareHash(this.password, hash);
  }
  public validate(password: string) {
    if (!password) {
      throw new Exaction("Password is required");
    }

    if (password.length < 8) {
      throw new Exaction("Invalid password");
    }
  }
}
