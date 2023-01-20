### Serviço de login

Esta aplicaçao consiste em uma API para realização de login, podendo ser utilizada em serviços que tenham a necessidade de criação de uma conta de usuário e a entrega de recursos/serviços somente para usuários devidamente cadastrados e autênticados.

#### Tecnologias utilizadas

Para desenvolvimento deste serviço, foram utilizadas as seguintes tecnologias:

- Node
- JavaScript/Typescript
- PostgresSql
- express
- prisma ORM
- vitest
- swagger
- yarn
- winston
- bcrypt
- jsonwebToken

#### Informações adcionais

No desenvolvimento procurou-se aplicar princípios SOLID com a construção de abstraçoes e para evitar um forte acoplamento entre os componentes

### Endpoints de requisição

| endpoint                 | verbo HTTP | Descrição                                |
| ------------------------ | ---------- | ---------------------------------------- |
| /api/user/docs           | GET        | Documentação com swaagger                |
| /api/user/register       | POST       | Cadastro de novos usuários               |
| /api/user/login          | POST       | Login para usuários cadastrados          |
| /api/user/forgotpassword | POST       | Envio de email para recuperação de senha |
| /api/user/resetpassword  | POST       | Modifica a senha                         |

### Iniciando aplicação

Para iniciar esta aplicação siga os seguintes passos:

- Clone este repositório e instale as dependências com o comando `yarn install`.
- Modifique o arquivo `.env.example` para `.env` e defina as variáveis de ambiente necessárias.
- Execute as migrations com o comando `yarn migrate:run`
- inicialize o servidor em modo de desenvolvimento com o comando `yarn start:dev`, ou em modo de produção com o comando `yarn start:prod`, neste ultimo caso uma pasta **dist** será criada na raiz do repositório.

### Modelo de dados da requisição

Ao fazer o cadastro de um novo usuário, os seguintes dados devem ser enviados em formato json:

```
name: string
lastname: string
email: string
password: string
birthday: date (YYYY-MM-DD)
```

Ao fazer o login de um usuário já cadastrado envie os seguintes dados em formato json:

```
email: string
password: string
```
