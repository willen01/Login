import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { JWTToken } from "../../../../infra/shared/token/jwtToken";
import { UserRepositoryPrisma } from "../../../register/respositories/implementation/prisma/UserRepositoryPrisma";
import { LoginUserController } from "./LoginUserController";

const userPrismaRepository = new UserRepositoryPrisma();
const bcrypt = new PasswordBcrypt();
const jwtToken = new JWTToken();
const loginUserController = new LoginUserController(
  userPrismaRepository,
  bcrypt,
  jwtToken
);

export { loginUserController };
