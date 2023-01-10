import { Request, Response } from "express";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../respositories/user.repository";
import { CreateUserUseCase } from "./createUser";

export class CreateUserController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body;

      const useCase = new CreateUserUseCase(this.userRepository);
      const result = await useCase.execute(data);

      //registro da operação com logger
      logger.info("Usuário cadastrado com sucesso");
      return response.json(result);
    } catch (error: any) {
      //registro da operação com logger
      logger.error(error.stack);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
