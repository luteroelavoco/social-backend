import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { IAuthTokenService } from "../../services/IAuthTokenService";

export class CreaterUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider,
    private authTokenService: IAuthTokenService
  ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    const newUser = await this.usersRepository.save(user);
    const token = this.authTokenService.generateToken(newUser.email);
    await this.mailProvider.sendEmail({
      to: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
      },
      from: {
        name: "Social Teste",
        email: "testesocial@gmail.com",
      },
      subject: "Seja Bem vindo a plataforma",
      body: `<p> Esse email foi cadastrada na nossa plataforma para validação desse email  <a href="https://socialfrontend.vercel.app/verify-email?token=${token}">clique no link </a> </p>`,
    });

    return newUser;
  }
}
