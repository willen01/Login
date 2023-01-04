import { Request, Response } from "express";
import { IUserRepository } from "../../respositories/user.repository";
import { CreateUserUseCase } from "./createUser";

export class CreateUserController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body;
      const useCase = new CreateUserUseCase(this.userRepository);
      const result = await useCase.execute(data);
      return response.json(result);
    } catch (error: any) {
      return response.json({ error: error.message });
    }
  }
}
