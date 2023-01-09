import { UserRepositoryPrisma } from "../../../register/respositories/implementation/prisma/UserRepositoryPrisma";
import { LoginUserController } from "./LoginUserController";

const userPrismaRepository = new UserRepositoryPrisma();
const loginUserController = new LoginUserController(userPrismaRepository);

export { loginUserController };
