import { describe, test, expect, beforeAll } from "vitest";
import { UserRepositoryInMemory } from "../../../register/respositories/implementation/inMemory/UserRepositoryInMemory";
import { IUserRepository } from "../../../register/respositories/user.repository";
import {
  CreateUserRequest,
  CreateUserUseCase,
} from "../../../register/useCases/createUser/createUser";
import { LoginUserUseCase } from "../LoginUser/LoginUser";

let repository: IUserRepository;

beforeAll(async () => {
  repository = new UserRepositoryInMemory();
  const createUserUseCase = new CreateUserUseCase(repository);

  const userFake: CreateUserRequest = {
    name: "Jhon",
    lastname: "Doe",
    email: "jhon.doe@email.com",
    birthday: new Date("1999-05-03"),
    password: "123123",
  };

  await createUserUseCase.execute(userFake);
});

describe("LoginUser UseCase", () => {
  test("should be able to login to existing count", async () => {
    const userCredentials = {
      email: "jhon.doe@email.com",
      password: "123123",
    };

    const loginUseCase = new LoginUserUseCase(repository);
    const result = await loginUseCase.execute(userCredentials);

    expect(result).toBe(true);
  });

  test("should not be able to login with email incorrect or unexists", async () => {
    const userCredentials = {
      email: "jho.doe@email.com",
      password: "123123",
    };

    const loginUseCase = new LoginUserUseCase(repository);

    expect(async () => {
      await loginUseCase.execute(userCredentials);
    }).rejects.toThrowError("Email or password incorrect!");
  });

  test("should not be able to login with password incorrect", async () => {
    const userCredentials = {
      email: "jhon.doe@email.com",
      password: "12312",
    };

    const loginUseCase = new LoginUserUseCase(repository);

    expect(async () => {
      await loginUseCase.execute(userCredentials);
    }).rejects.toThrowError("Email or password incorrect!");
  });
});
