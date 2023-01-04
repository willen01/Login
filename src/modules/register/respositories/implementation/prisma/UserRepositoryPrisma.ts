import { prismaClient } from "../../../../../infra/database/prisma.config";
import { User } from "../../../entities/user.entity";
import { IUserRepository } from "../../user.repository";

export class UserRepositoryPrisma implements IUserRepository {
  async save(user: User): Promise<User> {
    const savedUser = prismaClient.user.create({
      data: {
        ...user,
      },
    });

    return savedUser;
  }
  findUserByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
}
