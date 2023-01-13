import { User } from "@prisma/client";
import { CustomError } from "../../../errors/custon.error";
import { IUserRepository } from "../../register/respositories/user.repository";
import { transport } from "../../../email/mailer";
import { IToken } from "../../../infra/shared/token/token";

export class ForgotPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenUser: IToken
  ) {}

  async execute(email: string) {
    //busca usuário cadastrado com o email enviado pelo cliente
    const user: User = await this.userRepository.findUserByEmail(email);

    //erro na inexistência de um usuário cadastrado
    if (!user) throw new CustomError("user not registered", 404);

    //gera o token
    const token = this.tokenUser.create(user);

    //envio de email
    await transport.sendMail({
      from: "suporte@api.com.br",
      to: email,
      subject: "Recuperação de senha",
      html: `<h3>Olá ${user.name}</h3>
            <p>Para definir uma nova senha, <a href=http://localhost:${3333}/api/user/resetpassword?tokenId=${token} >clique aqui</a>, caso você não tenha solicitado este serviço, desconsidere este email e entre em contato com a central de segurança.</p>
            `,
    });

    //envia para o cliente o token criptografado para ser inserido no endpoit que atualiza a senha
    return token;
  }
}
