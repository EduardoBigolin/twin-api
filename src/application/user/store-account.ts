import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { User } from "../../domain/user/User";
import { IUserRepository } from "../../domain/user/user-repository";
import { HandleReturn } from "../common/handleReturn";
import { UserExistEmailService } from "./services/user-exist-email";

interface ISaveUser {
  name: string;
  email: string;
  password: string;
}
interface SaveUserRepository {
  userRepository: IUserRepository;
}

export class StoreAccount {
  public userRepository: IUserRepository;

  constructor(repository: SaveUserRepository) {
    this.userRepository = repository.userRepository;
  }

  async execute(userData: ISaveUser): Promise<HandleReturn> {
    try {
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
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
        user: {
          id: userCreated.id,
          name: userCreated.name,
          email: userCreated.email.getEmail(),
          isAuthenticated: userCreated.isAuthenticated
        },
        error: false,
        message: "User created with success"
      };

      // await HandleEmail.createUser({
      //   name: user.name,
      //   email: user.email.getEmail(),
      //   id: user.getId(),
      // });
      return {
        statusCode: StatusCode.CREATED,
        body: { response: output },
      };
    } catch (error: any) {
      console.log(error);
      
      return {
        statusCode: error.statusCode,
        body: {
          response: {
            message: error.message,
            error: true
          }
        },
      };
    }
  }
}
