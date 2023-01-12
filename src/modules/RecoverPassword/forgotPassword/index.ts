import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt";
import { JWTToken } from "../../../infra/shared/token/jwtToken";
import { UserRepositoryPrisma } from "../../register/respositories/implementation/prisma/UserRepositoryPrisma";
import { ForgotPasswordController } from "./forgotPasswordController";

const userRepository = new UserRepositoryPrisma();
const passcrypto = new PasswordBcrypt();
const jwtToken = new JWTToken();

const forgotPasswordController = new ForgotPasswordController(
  userRepository,
  passcrypto,
  jwtToken
);

export { forgotPasswordController };
