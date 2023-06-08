import { IUserRepository } from "../../adapters/user/user-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { HandleReturn } from "../common/handleReturn";
import { UserExistEmailService } from "./services/user-exist-email";

interface IUserAuth {
  email: string;
  password: string;
}

interface LoginRepository {
  userRepository: IUserRepository;
}

export class Login {
  public userRepository: IUserRepository;

  constructor(repository: LoginRepository) {
    this.userRepository = repository.userRepository;
  }
  async execute(userData: IUserAuth): Promise<HandleReturn> {
    try {
      const user = await new UserExistEmailService(this.userRepository).execute(
        userData.email
      );
      if (!user) {
        throw new Exception(
          "Invalid email or password",
          StatusCode.BAD_REQUEST
        );
      }

      const userAuth = await user.password.comparePassword(userData.password);
      if (!userAuth) {
        throw new Exception(
          "Invalid email or password",
          StatusCode.BAD_REQUEST
        );
      }
      const token = user.getToken();
      const output = {
        response: {
          token: token,
          user: {
            name: user.name,
            email: user.email.getEmail(),
          },
        },
      };

      return {
        statusCode: StatusCode.OK,
        body: output,
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}
