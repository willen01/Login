import { User } from "@prisma/client";

export type TokenUser = {
  sub: string;
};

export type idInToken = {
  id: string;
};

export interface IToken {
  create(user: User): string;
  validate(token: string): TokenUser | null;
  decode(token: string): TokenUser | null;
}
