import { User } from "@prisma/client";

export type TokenUser = {
  sub: string;
};

export interface IToken {
  create(user: User): string;
  validate(token: string): TokenUser | null;
}
