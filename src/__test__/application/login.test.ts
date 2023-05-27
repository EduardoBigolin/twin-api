import { describe, expect, test } from "vitest";
import { faker } from "@faker-js/faker";
import { StoreAccount } from "../../application/user/store-account";
import { UserPrismaRepository } from "../../adapters/user/user.prisma.repository";
import { Login } from "../../application/user/login";

describe("Create User with valid data", async () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const repository = new UserPrismaRepository();
  await new StoreAccount(repository).execute({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  test("should return a login User with valid data", async () => {
    const repository = new UserPrismaRepository();
    const useCase = await new Login(repository).execute({
      email: input.email,
      password: input.password,
    });

    expect(useCase).toBeTruthy();
    expect(useCase.statusCode).toBe(200);
    expect(useCase.body).toBeTypeOf("object");
    expect(useCase.body.token).toBeTruthy();
    expect(useCase.body.user).toBeTruthy();
  });

  test("should return a login User with valid data", async () => {
    const repository = new UserPrismaRepository();
    const useCase = await new Login(repository).execute({
      email: "INVALID",
      password: input.password,
    });

    expect(useCase).toBeTruthy();
    expect(useCase.statusCode).toBe(400);
    expect(useCase.body).toBeTypeOf("string");
    expect(useCase.body).toBe("User not found");
  });

  test("should return a login User with valid data", async () => {
    const repository = new UserPrismaRepository();
    const useCase = await new Login(repository).execute({
      email: input.email,
      password: "Invalid",
    });

    expect(useCase).toBeTruthy();
    expect(useCase.statusCode).toBe(400);
    expect(useCase.body).toBeTypeOf("string");
    expect(useCase.body).toBe("Invalid email or password");
  });
});
