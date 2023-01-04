import { randomUUID } from "crypto";

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

  static create(props: IUser) {
    const user = new User(props);
    return user;
  }
}
