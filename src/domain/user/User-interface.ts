import { Email } from "./User-email";
import { Password } from "./User-password";

export interface IUser {
  id?: string;
  name: string;
  email: Email;
  password: Password;
  isAuthenticated: boolean;
}
