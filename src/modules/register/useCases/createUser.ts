import { User } from "../entities/user.entity";
import { IUserRepository } from "../respositories/user.repository";

export type CreateUserRequest = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthday: Date;
}; //dados que devem ser enviados pelo cliente.

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserRequest) {
    //deve verificar se o usuário já está cadastrado
    const findUserAlreadyRegistered = await this.userRepository.findUserByEmail(
      data.email
    );

    if (findUserAlreadyRegistered) throw new Error("User already registered!");

    const user = await User.create(data);
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
