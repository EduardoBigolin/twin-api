import { IUserRepository } from "../../adapters/user/user-repository";
import { Exaction, StatusCode } from "../../domain/common/Exaction";
import { HandleCode, HandleReturn } from "../common/handleReturn";
import { UserExistService } from "./services/user-exist";

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
      const user = await new UserExistService(this.userRepository).execute(
        userData.email
      );
      if (!user) {
        throw new Exaction("Invalid email or password", StatusCode.BAD_REQUEST);
      }

      const userAuth = await user.password.comparePassword(userData.password);
      if (!userAuth) {
        throw new Exaction("Invalid email or password", StatusCode.BAD_REQUEST);
      }

      const output = {
        response: { user },
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
