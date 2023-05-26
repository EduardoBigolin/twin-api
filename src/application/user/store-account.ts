import { IUserRepository } from "../../adapters/user/user.repository";
import { Exaction } from "../../domain/common/Exaction";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/user/User-email";
import { Password } from "../../domain/user/User-password";
import { HandleReturn, StatusCode } from "../common/handleReturn";

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

      return {
        statusCode: StatusCode.CREATED,
        body: userCreated,
      };
    } catch (error: any) {
      if (error instanceof Exaction) {
        return {
          statusCode: StatusCode.BAD_REQUEST,
          body: error.message,
        };
      }
      console.error(error);
      return {
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        body: "Server Error",
      };
    }
  }
}
