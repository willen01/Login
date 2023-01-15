import { beforeAll, describe, expect, test } from "vitest";
import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { IpasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { User } from "../../../register/entities/user.entity";
import { UserRepositoryInMemory } from "../../../register/respositories/implementation/inMemory/UserRepositoryInMemory";
import {
  CreateUserRequest,
  CreateUserUseCase,
} from "../../../register/useCases/createUser/createUser";
import { ResetPasswordUseCase } from "../resetPasswordUseCase";

//declaração de variáveis e criação de instâncias necessárias
let createNewUser: User;
let userRepository: UserRepositoryInMemory;
const passwordBcrypt: IpasswordCrypto = new PasswordBcrypt();
const userFake: CreateUserRequest = {
  name: "Jhon",
  lastname: "Doe",
  email: "jhon.doe@email.com",
  birthday: new Date("1999-05-03"),
  password: "159753",
};

//cria um novo usuário antes de executar todos os testes
beforeAll(async () => {
  userRepository = new UserRepositoryInMemory();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  createNewUser = await createUserUseCase.execute(userFake);
});

//testes
describe("ResetPasswordUseCase", () => {
  test("should not be able to reset password with password and resetPassword diferent", async () => {
    const resetPasswordUseCase = new ResetPasswordUseCase(
      userRepository,
      passwordBcrypt
    );

    //senha conflitantes
    const password: string = "123123";
    const confirmPassword: string = "aaaa";

    //tentativa de mudança de senha resultando em rejeição
    expect(async (): Promise<boolean> => {
      return await resetPasswordUseCase.execute(
        createNewUser.id,
        password,
        confirmPassword
      );
    }).rejects.toThrowError("password and confirmPassword are diferent");
  });

  test("testing", async () => {
    const resetPasswordUseCase = new ResetPasswordUseCase(
      userRepository,
      passwordBcrypt
    );

    //nova senha
    const password: string = "123123";
    const confirmPassword: string = "123123";

    //senha anterior do usuário
    const previousPassword: string = createNewUser.password;

    //atualiza senha
    const resetPasswordUser: boolean = await resetPasswordUseCase.execute(
      createNewUser.id,
      password,
      confirmPassword
    );

    //senha atualizada
    const updatedPassword: string = createNewUser.password;

    expect(resetPasswordUser).toBe(true);
    expect(previousPassword == updatedPassword).toBe(false);
  });
});
