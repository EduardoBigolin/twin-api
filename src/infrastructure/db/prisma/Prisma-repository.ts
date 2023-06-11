import { PrismaClient } from "@prisma/client";

export class PrismaRepository {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
}
