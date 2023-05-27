import { Exaction, StatusCode } from "../common/Exaction";

export class Email {
  public email: string;
  constructor(email: string) {
    this.validate(email);
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  public validate(email: string) {
    if (!email) {
      throw new Exaction("Invalid Email", StatusCode.BAD_REQUEST);
    }
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      throw new Exaction("Invalid email", StatusCode.BAD_REQUEST);
    }
  }
}
