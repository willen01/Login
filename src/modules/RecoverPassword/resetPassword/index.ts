import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt";
import { JWTToken } from "../../../infra/shared/token/jwtToken";
import { UserRepositoryPrisma } from "../../register/respositories/implementation/prisma/UserRepositoryPrisma";
import { ResetPasswordController } from "./resetPasswordController";

const userRepository = new UserRepositoryPrisma();
const passwordcypto = new PasswordBcrypt();
const jwtToketn = new JWTToken();

const resetPasswordController = new ResetPasswordController(
  userRepository,
  passwordcypto,
  jwtToketn
);

export { resetPasswordController };
