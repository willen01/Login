import { Request, Response } from "express";
import { IpasswordCrypto } from "../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../infra/shared/token/token";
import { IUserRepository } from "../../register/respositories/user.repository";
import { ResetPasswordUseCase } from "./resetPasswordUseCase";

export class ResetPasswordController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IpasswordCrypto,
    private tokenUser: IToken
  ) {}

  async handle(request: Request, response: Response) {
    try {
      //pega o token que vem pela url
      const tokenId = request.query.tokenId as string;

      // extrai o id do usuário que está no tokem dentro da propriedade sub
      const { sub } = this.tokenUser.decode(tokenId);

      // recebe os campos de senha e confirmação de senha
      const { password, confirmPassword } = request.body;

      const resetPasswordUseCase = new ResetPasswordUseCase(
        this.userRepository,
        this.passwordCrypto
      );

      //atualiza com a nova senha
      await resetPasswordUseCase.execute(sub, password, confirmPassword);
      response.status(200).end();
    } catch (error: any) {
      response.status(error.statusCode).json({ error: error.message });
    }
  }
}
