import { JWTToken } from "../../../infra/shared/token/jwtToken";
import { UserRepositoryPrisma } from "../../register/respositories/implementation/prisma/UserRepositoryPrisma";
import { ForgotPasswordController } from "./forgotPasswordController";

const userRepository = new UserRepositoryPrisma();
const jwtToken = new JWTToken();

const forgotPasswordController = new ForgotPasswordController(
  userRepository,
  jwtToken
);

export { forgotPasswordController };
