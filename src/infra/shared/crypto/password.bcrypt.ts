import bcrypt from "bcryptjs";
import { IpasswordCrypto } from "./password.crypto";

export class PasswordBcrypt implements IpasswordCrypto {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  } //criptografa o password recebido
}
