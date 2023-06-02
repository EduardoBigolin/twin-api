import { IUserRepository } from "../../adapters/user/user-repository";
import { Exception, StatusCode } from "../../domain/common/Exception";
import { HandleCode, HandleReturn } from "../common/handleReturn";
import { UserExistEmailService } from "./services/user-exist-email";

interface userAuth {
  email: string;
  password: string;
}

export class Login {
  public userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(userData: userAuth): Promise<HandleReturn> {
    try {
      const user = await new UserExistEmailService(this.userRepository).execute(
        userData.email
      );
      if (!user) {
        throw new Exception("Invalid email or password", StatusCode.BAD_REQUEST);
      }

      const userAuth = await user.password.comparePassword(userData.password);
      if (!userAuth) {
        throw new Exception("Invalid email or password", StatusCode.BAD_REQUEST);
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
        statusCode: HandleCode.OK,
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
