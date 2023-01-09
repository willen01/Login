import { Request, Response } from "express";
import { IUserRepository } from "../../../register/respositories/user.repository";
import { LoginUserUseCase } from "./LoginUser";

export class LoginUserController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body;
      const useCase = new LoginUserUseCase(this.userRepository);
      await useCase.execute(data);
      return response.end();
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
