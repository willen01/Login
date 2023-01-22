import { Request, Response } from "express";
import { IpasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
// import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../../register/respositories/user.repository";
import { LoginUserUseCase } from "./LoginUser";

export class LoginUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IpasswordCrypto,
    private token: IToken
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body;
      const useCase = new LoginUserUseCase(
        this.userRepository,
        this.passwordCrypto,
        this.token
      );

      const token = await useCase.execute(data);
      // logger.info("login realizado com sucesso");
      return response.status(200).json({ token });
    } catch (error: any) {
      // logger.error(error.stack);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
