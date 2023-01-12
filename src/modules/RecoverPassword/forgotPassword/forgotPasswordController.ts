import { Request, Response } from "express";
import { IUserRepository } from "../../register/respositories/user.repository";
import { ForgotPasswordUseCase } from "./forgotPasswordUseCase";

export class ForgotPasswordController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const { email } = request.body;
      const forgotPasswordUseCase = new ForgotPasswordUseCase(
        this.userRepository
      );
      await forgotPasswordUseCase.execute(email);
      response.status(200).end();
    } catch (error: any) {
      response.status(error.statusCode).json(error.message);
    }
  }
}
