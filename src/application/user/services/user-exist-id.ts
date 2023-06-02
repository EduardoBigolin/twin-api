import { IUserRepository } from "../../../adapters/user/user-repository";

export class UserExistIdService {
  constructor(public userRepository: IUserRepository) {}
  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    return user;
  }
}
