import { describe, expect, test } from "vitest";
import { faker } from "@faker-js/faker";
import { StoreAccount } from "../../application/user/store-account";
import { UserPrismaRepository } from "../../adapters/user/user-prisma-repository";
import { VerifyUser } from "../../application/user/verify-user";

describe("Verify user", async () => {
  const repository = new UserPrismaRepository();

  test("Verify user if all data is correct", async () => {
    const input = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const newUser = await new StoreAccount(repository).execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });
    const useCase = await new VerifyUser(repository).execute(
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
    const newUser = await new StoreAccount(repository).execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });
    console.log(newUser.body.response);

    await new VerifyUser(repository).execute(newUser.body.response.user.id);
    const useCase = await new VerifyUser(repository).execute(
      newUser.body.response.user.id
    );

    expect(useCase).toBeTruthy();
    expect(useCase.statusCode).toBe(400);
    expect(useCase.body.response).toBe(`User already authenticated`);
  }, 50000);
});
