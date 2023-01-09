import { prismaClient } from "../../../../infra/database/prisma.config";
import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { IUserRepository } from "../../../register/respositories/user.repository";

export type LoginUserRequest = {
  email: string;
  password: string;
};

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginUserRequest) {
    const findUser = await this.userRepository.findUserByEmail(data.email); // busca se o usuário está cadastrado no banco de dados.

    if (!findUser) throw new Error("Email or password incorrect!");

    //verifica se o password recebido é compatível com o registrado no banco
    const comparePassword = new PasswordBcrypt();
    const isEqual: boolean = await comparePassword.compare(
      data.password,
      findUser.password
    );

    if (!isEqual) throw new Error("Email or password incorrect!");

    //login realizado com sucesso!
    return true;
  }
}
