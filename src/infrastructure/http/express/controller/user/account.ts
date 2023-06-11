import { Request, Response } from "express";
import { VerifyUser } from "../../../../../application/user";
import { UserPrismaRepository } from "../../../../db/prisma/user-prisma-repository";

export class VerifyAccountController {
  static async execute(req: Request, res: Response) {
    const { id } = req.params;

    const repository = new UserPrismaRepository();
    const useCase = await new VerifyUser(repository).execute(id);

    return res.status(useCase.statusCode).json(useCase.body);
  }
}
