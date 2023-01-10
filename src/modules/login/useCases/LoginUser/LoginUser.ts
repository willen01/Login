import { CustomError } from "../../../../errors/custon.error";
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
    if (!data.email || !data.password) {
      throw new CustomError("Invalid or empty fields!", 400);
    } //Verifica se o usuário não envou ou enviou algum campo de login vazio

    const findUser = await this.userRepository.findUserByEmail(data.email); // busca se o usuário está cadastrado no banco de dados.

    if (!findUser) throw new Error("Email or password incorrect!");

    //verifica se o password recebido é compatível com o registrado no banco
    const comparePassword = new PasswordBcrypt();
    const isEqual: boolean = await comparePassword.compare(
      data.password,
      findUser.password
    );

    if (!isEqual) throw new CustomError("Email or password incorrect!", 403);

    //login realizado com sucesso!
    return true;
  }
}
