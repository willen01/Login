import { User } from "../entities/user.entity";

export interface IUserRepository {
  save(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | undefined>;
}
