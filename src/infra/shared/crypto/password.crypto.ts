export interface IpasswordCrypto {
  hash(password: string): Promise<string>;
}
