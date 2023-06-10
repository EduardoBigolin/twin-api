import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { StoreAccount } from "../../../application/user/store-account";
import { VerifyUser } from "../../../application/user/verify-user";
import { UserPrismaRepository } from "../../../infrastructure/db/prisma/user-prisma-repository";

describe("Verify user", async () => {
  const userRepository = new UserPrismaRepository();

  test("Verify user if all data is correct", async () => {
    const input = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const newUser = await new StoreAccount({ userRepository }).execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });
    const useCase = await new VerifyUser(userRepository).execute(
      newUser.body.response.user.id
    );

    expect(useCase).toBeTruthy();
    expect(useCase.statusCode).toBe(200);
    expect(useCase.body.response.message).toBe(
      `User ${newUser.body.response.user.name} authenticated successfully`
    );
  }, 50000);

  test("should return new error if user has already been authenticated", async () => {
    const input = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const newUser = await new StoreAccount({ userRepository }).execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    await new VerifyUser(userRepository).execute(newUser.body.response.user.id);

    const useCase = await new VerifyUser(userRepository).execute(
      newUser.body.response.user.id
    );

    expect(useCase).toBeTruthy();
    expect(useCase.statusCode).toBe(400);
    expect(useCase.body.response).toBe(`User already authenticated`);
  });
});
