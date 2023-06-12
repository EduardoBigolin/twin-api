import { Request, Response } from "express";
import { Login } from "../../../../../application/user";
import { UserPrismaRepository } from "../../../../db/prisma/user-prisma-repository";

export class SignInController {
  static async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = new UserPrismaRepository();
    const useCase = await new Login({ userRepository }).execute({
      email: email,
      password: password,
    });

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
