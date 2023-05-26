import bcrypt from "bcrypt";

export class Hash {
  public static async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  public static async compareHash(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
