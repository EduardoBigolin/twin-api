import { Request, Response } from "express";
import { UserPrismaRepository } from "../../../../../adapters/user/user-prisma-repository";
import { StoreAccount } from "../../../../../application/user";

export class SignUpController {
  static async execute(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userRepository = new UserPrismaRepository();
    const useCase = await new StoreAccount({ userRepository }).execute({
      name: name,
      email: email,
      password: password,
    });

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
