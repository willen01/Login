import { describe, test, expect } from "vitest";
import { UserRepositoryInMemory } from "../../../respositories/implementation/inMemory/UserRepositoryInMemory";
import { CreateUserRequest, CreateUserUseCase } from "../createUser";

describe("CreateUser UseCase", () => {
  test("should be able to register a new user", async () => {
    const userRepository = new UserRepositoryInMemory();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const userFake: CreateUserRequest = {
      name: "Jhon",
      lastname: "Doe",
      email: "jhon.doe@email.com",
      birthday: new Date("1999-05-03"),
      password: "123123",
    };

    const user = await createUserUseCase.execute(userFake);
    expect(user).toHaveProperty("id");
  });

  test("should not be able to create a user with email exist", async () => {
    const userRepository = new UserRepositoryInMemory();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const userFake: CreateUserRequest = {
      name: "Jhon",
      lastname: "Doe",
      email: "jhon.doe@email.com",
      birthday: new Date("1999-05-03"),
      password: "123123",
    };

    await createUserUseCase.execute(userFake);

    expect(async () => {
      await createUserUseCase.execute(userFake);
    }).rejects.toThrowError("User already registered!");
  });

  test("should not be able to create a user with empty fields", async () => {
    const userRepository = new UserRepositoryInMemory();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const userFake: CreateUserRequest = {
      name: "",
      lastname: "",
      email: "jhone.doe@email.com",
      birthday: new Date("1999-05-03"),
      password: "123123",
    };
    expect(async () => {
      await createUserUseCase.execute(userFake);
    }).rejects.toThrowError("Invalid or empty fields!");
  });
});
