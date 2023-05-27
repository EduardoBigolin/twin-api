import { IUserRepository } from "../../adapters/user/user.repository";
import { Exaction } from "../../domain/common/Exaction";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/user/User-email";
import { Password } from "../../domain/user/User-password";
import { HandleCode, HandleReturn } from "../common/handleReturn";

interface saveUserDto {
  name: string;
  email: string;
  password: string;
}

export class StoreAccount {
  public userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: saveUserDto): Promise<HandleReturn> {
    try {
      const user = new User({
        name: userData.name,
        email: new Email(userData.email),
        password: new Password(userData.password),
      });

      const userExists = await this.userRepository.findByEmail(
        user.email.getEmail()
      );
      if (userExists) {
        throw new Error("User already exists");
      }

      const userCreated = await this.userRepository.create(user);
      const token = userCreated.getToken();
      const output = {
        user: userCreated,
        token,
      };
      return {
        statusCode: HandleCode.CREATED,
        body: output,
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: error.message,
      };
    }
  }
}
