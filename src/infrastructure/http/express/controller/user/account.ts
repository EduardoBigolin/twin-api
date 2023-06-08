import { Request, Response } from "express";
import { UserPrismaRepository } from "../../../../../adapters/user/user-prisma-repository";
import { VerifyUser } from "../../../../../application/user";

export class VerifyAccountController {
  static async execute(req: Request, res: Response) {
    const { id } = req.params;

    const repository = new UserPrismaRepository();
    const useCase = await new VerifyUser(repository).execute(id);

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
