import bcrypt from "bcryptjs";
import { IpasswordCrypto } from "./password.crypto";

export class PasswordBcrypt implements IpasswordCrypto {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  } //criptografa o password recebido

  async compare(password: string, passwordHash: string): Promise<boolean> {
    const isEquals: boolean = await bcrypt.compare(password, passwordHash);
    return isEquals;
  } // compara password recebido com o password codificado
}
