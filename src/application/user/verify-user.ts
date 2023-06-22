import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { IUserRepository } from "../../domain/user/user-repository";

export class VerifyUser {
  public userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string) {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new Exception("User not found", StatusCode.BAD_REQUEST);
      }
      if (user.isAuthenticated) {
        throw new Exception(
          "User already authenticated",
          StatusCode.BAD_REQUEST
        );
      }

      await this.userRepository.updateAuthenticated(id);

      // await HandleEmail.authenticatedUser({
      //   email: user.email.getEmail(),
      //   name: user.name,
      // });
      return {
        statusCode: StatusCode.OK,
        body: {
          response: {
            message: `User ${user.name} authenticated successfully`,
            error: false,
          },
        },
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: { message: error.message, error: false } },
      };
    }
  }
}
