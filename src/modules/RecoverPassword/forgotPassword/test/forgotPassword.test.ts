import { User } from "@prisma/client";
import { describe, test, expect, beforeAll } from "vitest";
import { UserRepositoryInMemory } from "../../../register/respositories/implementation/inMemory/UserRepositoryInMemory";
import { IUserRepository } from "../../../register/respositories/user.repository";
import {
  CreateUserRequest,
  CreateUserUseCase,
} from "../../../register/useCases/createUser/createUser";
import { ForgotPasswordUseCase } from "../forgotPasswordUseCase";
import { JWTToken } from "../../../../infra/shared/token/jwtToken";

let repository: IUserRepository;
const jwtToken = new JWTToken();

//salva um usuário no repositório em memória.
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

describe("forgotPasswordUseCase", () => {
  test("should be able to find user registered", async () => {
    const forgotPasswordUseCase = new ForgotPasswordUseCase(
      repository,
      jwtToken
    );

    const registeredUser = "jhon.doe@email.com";

    const userToken = await forgotPasswordUseCase.execute(registeredUser);
    //quando o teste tem sucesso a operação devolve um token jwt com tamanho 316
    expect(userToken.length).toBe(316);
  });

  test("should be able identify an unregistered user", () => {
    const forgotPasswordUseCase = new ForgotPasswordUseCase(
      repository,
      jwtToken
    );

    const unregistredUser = "robert.maza@email.com";

    expect(async () => {
      await forgotPasswordUseCase.execute(unregistredUser);
    }).rejects.toThrowError("user not registered");
  });
});
