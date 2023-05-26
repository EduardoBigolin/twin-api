import { expect, test } from "vitest";
import { faker } from "@faker-js/faker";
import { UserPrismaRepository } from "../../adapters/user/user.prisma.repository";
import { StoreAccount } from "../../application/user/store-account";

test("Create User with valid data", async () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const repository = new UserPrismaRepository();
  const useCase = await new StoreAccount(repository).execute({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  expect(useCase).toBeTruthy();
});

test("Create User with valid data", async () => {
  const input = {
    name: faker.name.fullName(),
    email: "Test",
    password: faker.internet.password(),
  };
  const repository = new UserPrismaRepository();
  const useCase = await new StoreAccount(repository).execute({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  expect(useCase.statusCode).toBe(400);
  expect(useCase.body).toBe("Invalid email");
});

test("Create User with valid data", async () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: "Inv",
  };
  const repository = new UserPrismaRepository();
  const useCase = await new StoreAccount(repository).execute({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  expect(useCase.statusCode).toBe(400);
  expect(useCase.body).toBe("Invalid password");
});
