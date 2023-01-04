import { prismaClient } from "../../../../../infra/database/prisma.config";
import { User } from "../../../entities/user.entity";
import { IUserRepository } from "../../user.repository";

export class UserRepositoryPrisma implements IUserRepository {
  async save(user: User): Promise<User> {
    const savedUser = await prismaClient.user.create({
      data: {
        ...user,
        birthday: new Date(user.birthday),
      },
    });

    return savedUser;
  }
  async findUserByEmail(email: string): Promise<User | undefined> {
    const findUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (findUser) {
      return findUser;
    } else {
      return undefined;
    }
  }
}
