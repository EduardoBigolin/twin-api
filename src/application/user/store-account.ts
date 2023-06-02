import { IUserRepository } from "../../adapters/user/user-repository";
import { Exception, StatusCode } from "../../domain/common/Exception";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/user/User-email";
import { Password } from "../../domain/user/User-password";
import { HandleCode, HandleReturn } from "../common/handleReturn";
import { HandleEmail } from "./services/handle-email";
import { UserExistEmailService } from "./services/user-exist-email";

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
        isAuthenticated: false,
      });

      const userExists = await new UserExistEmailService(
        this.userRepository
      ).execute(user.email.getEmail());

      if (userExists) {
        throw new Exception("User already exists", StatusCode.BAD_REQUEST);
      }

      const userCreated = await this.userRepository.create(user);
      const output = {
        user: userCreated,
      };
      await HandleEmail.createUser({
        name: user.name,
        email: user.email.getEmail(),
        id: user.getId(),
      });
      return {
        statusCode: HandleCode.CREATED,
        body: { response: output },
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}
