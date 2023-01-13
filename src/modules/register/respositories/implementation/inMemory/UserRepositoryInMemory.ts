import { CustomError } from "../../../../../errors/custon.error";
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

  async updatePassword(userId: string, password: string): Promise<boolean> {
    const userIndex: number = this.user.findIndex((user) => user.id == userId);

    if (userIndex == -1) return false;

    this.user[userIndex].password = password;
    return true;
  }
}
