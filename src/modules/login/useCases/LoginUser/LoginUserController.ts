import { Request, Response } from "express";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../../register/respositories/user.repository";
import { LoginUserUseCase } from "./LoginUser";

export class LoginUserController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body;
      const useCase = new LoginUserUseCase(this.userRepository);
      await useCase.execute(data);

      logger.info("login realizado com sucesso");
      return response.end();
    } catch (error: any) {
      logger.error(error.stack);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
