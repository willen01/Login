import { Request, Response } from "express";
import { IpasswordCrypto } from "../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../infra/shared/token/token";
import { IUserRepository } from "../../register/respositories/user.repository";
import { ForgotPasswordUseCase } from "./forgotPasswordUseCase";

export class ForgotPasswordController {
  constructor(
    private userRepository: IUserRepository,
    private passcrypto: IpasswordCrypto,
    private tokenUser: IToken
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { email } = request.body;
      const forgotPasswordUseCase = new ForgotPasswordUseCase(
        this.userRepository,
        this.passcrypto,
        this.tokenUser
      );
      const refreshPasswordCode = await forgotPasswordUseCase.execute(email);
      response.status(200).json({ refreshPasswordCode });
    } catch (error: any) {
      response.status(error.statusCode).json(error.message);
    }
  }
}
