import { UserRepositoryPrisma } from "../../register/respositories/implementation/prisma/UserRepositoryPrisma";
import { ForgotPasswordController } from "./forgotPasswordController";

const userRepository = new UserRepositoryPrisma();
const forgotPasswordController = new ForgotPasswordController(userRepository);

export { forgotPasswordController };
