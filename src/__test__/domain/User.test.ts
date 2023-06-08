import { faker } from "@faker-js/faker";
import { expect, test } from "vitest";
import { User } from "../../domain/user/User";

test("Create User with valid data", async () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const user = new User({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  expect(user).toBeTruthy();
  expect(user.name).toBe(input.name);
  expect(user.email.getEmail()).toBe(input.email);
  await user.password.hashPassword();
  const compare = await user.password.comparePassword(input.password);
  expect(compare).toBeTruthy();
});

test("Should return error if invalid email", () => {
  const input = {
    name: faker.name.fullName(),
    email: "Invalid Email",
    password: faker.internet.password(),
  };

  expect(() => {
    new User({
      name: input.name,
      email: input.email,
      password: input.password,
      isAuthenticated: false,
    });
  }).toThrow("Invalid email");
});

test("Should return error if password invalid", () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: "INV",
  };

  expect(() => {
    new User({
      name: input.name,
      email: input.email,
      password: input.password,
    });
  }).toThrow("Invalid password");
});
test("Should return password hash if password is valid", async () => {
  const input = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const user = new User({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  await user.password.hashPassword();
  const comparePassword = await user.password.comparePassword(input.password);
  expect(comparePassword).toBeTruthy();
});

test("Should return error if name is invalid", async () => {
  const input = {
    id: faker.datatype.uuid(),
    name: null as any,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  expect(() => {
    new User({
      name: input.name,
      email: input.email,
      password: input.password,
    });
  }).toThrow("User name is required");
});

test("Create user with Id", async () => {
  const input = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const user = new User({
    id: input.id,
    name: input.name,
    email: input.email,
    password: input.password,
  });
  expect(user).toBeTruthy();
  expect(user.getId()).toBe(input.id);
  expect(user.name).toBe(input.name);
  expect(user.email.getEmail()).toBe(input.email);
  await user.password.hashPassword();
  const compare = await user.password.comparePassword(input.password);

  expect(compare).toBeTruthy();
});
