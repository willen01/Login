import { CustomError } from "../../../errors/custon.error";
import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt";
import { IpasswordCrypto } from "../../../infra/shared/crypto/password.crypto";
import { IUserRepository } from "../../register/respositories/user.repository";

export class ResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IpasswordCrypto
  ) {}

  async execute(userId: string, password: string, confirmNewPassord: string) {
    //verifica se a e sua confirmação são iguais
    if (password != confirmNewPassord)
      throw new CustomError("password and confirmPassword are diferent", 400);

    //criptografa nova senha
    const encryptedPassword = await this.passwordCrypto.hash(password);

    //atualiza a senha
    const updatePasswordUser = await this.userRepository.updatePassword(
      userId,
      encryptedPassword
    );

    return updatePasswordUser;
  }
}
