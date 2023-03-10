import { IUserRepository } from "../../respositories/user.repository";
import { User } from "../../entities/user.entity";
import { CustomError } from "../../../../errors/custon.error";

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
    if (
      !data.name ||
      !data.lastname ||
      !data.email ||
      !data.password ||
      !data.birthday
    ) {
      throw new CustomError("Invalid or empty fields!", 400);
    } //Verifica se o usuário não envou ou enviou algum campo de cadastro vazio

    //deve verificar se o usuário já está cadastrado
    const findUserAlreadyRegistered = await this.userRepository.findUserByEmail(
      data.email
    );

    if (findUserAlreadyRegistered)
      throw new CustomError("User already registered!", 422);

    const user = await User.create(data);
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
