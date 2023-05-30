import { IUserRepository } from "../../adapters/user/user-repository";
import { Exaction, StatusCode } from "../../domain/common/Exaction";
import { HandleCode } from "../common/handleReturn";
import { HandleEmail } from "./services/handle-email";

export class VerifyUser {
  public userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Exaction("User not found", StatusCode.BAD_REQUEST);
      }
      if (user.isAuthenticated) {
        throw new Exaction(
          "User already authenticated",
          StatusCode.BAD_REQUEST
        );
      }

      await this.userRepository.updateAuthenticated(id);

      await HandleEmail.authenticatedUser({
        email: user.email.getEmail(),
        name: user.name,
      });
      return {
        statusCode: HandleCode.OK,
        body: {
          response: {
            message: `User ${user.name} authenticated successfully`,
          },
        },
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}
