import { Request, Response } from "express";
import { Login } from "../../../../../application/user/login";
import { UserPrismaRepository } from "../../../../../adapters/user/user-prisma-repository";

export class signInController {
  static async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    const repository = new UserPrismaRepository();
    const useCase = await new Login(repository).execute({
      email: email,
      password: password,
    });

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
