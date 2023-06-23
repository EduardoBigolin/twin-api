import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { StoreAccount } from "../../../application/user/store-account";
import { UserPrismaRepository } from "../../../infrastructure/db/prisma/user-prisma-repository";

describe("Create User", async () => {
  const userRepository = new UserPrismaRepository();
  test("Create User with valid data", async () => {
    const input = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const useCase = await new StoreAccount({ userRepository }).execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    expect(useCase).toBeTruthy();

    expect(useCase.statusCode).toBe(201);
    expect(useCase.body.response).toBeTypeOf("object");
  });

  test("Create User with valid data", async () => {
    const input = {
      name: faker.name.fullName(),
      email: "Test",
      password: faker.internet.password(),
    };
    const useCase = await new StoreAccount({ userRepository }).execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });
    expect(useCase.statusCode).toBe(400);
    expect(useCase.body.response.message).toBe("Invalid email");
  });

  test("Create User with valid data", async () => {
    const input = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: "Inv",
    };
    const useCase = await new StoreAccount({ userRepository }).execute({
      name: input.name,
      email: input.email,
      password: input.password,
    });
    expect(useCase.statusCode).toBe(400);

    expect(useCase.body.response.message).toBe("Invalid password");
  });
});
