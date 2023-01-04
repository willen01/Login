import { randomUUID } from "crypto";
import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt";

interface IUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthday: Date;
}

export class User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthday: Date;

  private constructor(props: IUser) {
    if (!props) {
      throw new Error("inconpleted fields");
    }

    this.id = randomUUID();
    this.name = props.name;
    this.lastname = props.lastname;
    this.email = props.email;
    this.password = props.password;
    this.birthday = props.birthday;
  }

  static async create(props: IUser) {
    const bcrypt = new PasswordBcrypt();
    const passwordHashed = await bcrypt.hash(props.password);

    //criptografa password enviado pelo cliente
    props.password = passwordHashed;

    const user = new User(props);
    return user;
  }
}
