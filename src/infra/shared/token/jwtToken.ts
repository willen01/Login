import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { idInToken, IToken, TokenUser } from "./token";
import { createHmac } from "crypto";
import "dotenv/config";

export class JWTToken implements IToken {
  private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN as string;
  private TOKEN_SECRET_CRYPTO = createHmac("sha256", this.TOKEN_SECRET).digest(
    "base64"
  );

  create({ id, name, email }: User): string {
    const token = jwt.sign(
      {
        user: { id, name, email }, //payload
      },
      this.TOKEN_SECRET_CRYPTO, //chave token
      {
        subject: id,
        expiresIn: "15m",
      }
    );
    return token;
  }
  validate(token: string): TokenUser | null {
    try {
      return jwt.verify(token, this.TOKEN_SECRET_CRYPTO) as TokenUser;
    } catch (error) {
      return null;
    }
  }

  decode(token: string): TokenUser | null {
    try {
      return jwt.verify(token, this.TOKEN_SECRET_CRYPTO) as TokenUser;
    } catch (error) {
      return null;
    }
  }
}
