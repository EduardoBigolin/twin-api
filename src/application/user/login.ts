import { IUserRepository } from "../../adapters/user/user.repository";
import { Exaction, StatusCode } from "../../domain/common/Exaction";
import { HandleCode, HandleReturn } from "../common/handleReturn";

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
      const user = await this.userRepository.findByEmail(userData.email);
      if (!user) {
        throw new Exaction("User not found", StatusCode.BAD_REQUEST);
      }
      const userAuth = await user.password.comparePassword(userData.password);
      if (!userAuth) {
        throw new Exaction("Invalid email or password", StatusCode.BAD_REQUEST);
      }
      const token = await user.getToken();

      const output = {
        user,
        token,
      };
      return {
        statusCode: HandleCode.OK,
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
