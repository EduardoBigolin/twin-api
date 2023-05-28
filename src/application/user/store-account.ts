import { IUserRepository } from "../../adapters/user/user-repository";
import { Exaction, StatusCode } from "../../domain/common/Exaction";
import { User } from "../../domain/user/User";
import { Email } from "../../domain/user/User-email";
import { Password } from "../../domain/user/User-password";
import { HandleCode, HandleReturn } from "../common/handleReturn";
import { HandleEmail } from "./services/handle-email";
import { UserExistService } from "./services/user-exist";

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

      const userExists = await new UserExistService(
        this.userRepository
      ).execute(user.email.getEmail());

      if (userExists) {
        throw new Exaction("User already exists", StatusCode.BAD_REQUEST);
      }

      const userCreated = await this.userRepository.create(user);
      const output = {
        user: userCreated,
      };
      await HandleEmail.createUser({
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
