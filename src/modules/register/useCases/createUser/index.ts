import { UserRepositoryPrisma } from "../../respositories/implementation/prisma/UserRepositoryPrisma";
import { CreateUserController } from "./createUserController";

const userPrismaRepository = new UserRepositoryPrisma();
const createUserController = new CreateUserController(userPrismaRepository);

export { createUserController };
