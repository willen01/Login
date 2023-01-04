import { User } from "../../../entities/user.entity";
import { IUserRepository } from "../../user.repository";

export class UserRepositoryInMemory implements IUserRepository {
  user: User[];

  constructor() {
    this.user = [];
  }

  async save(user: User): Promise<User> {
    this.user.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.user.find((user) => user.email == email);
  }
}
