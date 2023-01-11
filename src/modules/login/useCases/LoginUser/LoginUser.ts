import { CustomError } from "../../../../errors/custon.error";
import { IpasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../../register/respositories/user.repository";

export type LoginUserRequest = {
  email: string;
  password: string;
};

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IpasswordCrypto,
    private token: IToken
  ) {}

  async execute(data: LoginUserRequest) {
    //vefifica se o email ou senha não foram enviados pelo usuário.
    if (!data.email || !data.password)
      throw new CustomError("Email/Password is empty!", 401);

    //busca a existência de um usuário na base de dados com as informações enviadas pelo cliente
    const user = await this.userRepository.findUserByEmail(data.email);

    //erro para usuário não encontrado
    if (!user) throw new CustomError("Email or password incorrect!", 401);

    //verifica se a senha recebida é compatível com a armazenada no banco
    const comparePasswordEquals: boolean = await this.passwordCrypto.compare(
      data.password,
      user.password
    );

    //erro para senha incorreta
    if (!comparePasswordEquals)
      throw new CustomError("Email or password incorrect!", 401);

    //gera um token jwt
    const token = this.token.create(user);

    return token;
  }
}
