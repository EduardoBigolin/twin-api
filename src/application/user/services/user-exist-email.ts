import { IUserRepository } from "../../../adapters/user/user-repository";

export class UserExistEmailService {
  constructor(public userRepository: IUserRepository) {}
  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
