import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreaterUserUseCase {

  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {

  }
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

    const newUser = await this.usersRepository.save(user);
    await this.mailProvider.sendEmail({
      to: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email
      },
      from: {
        name: "Social Teste",
        email: "testesocial@gmail.com",
      },
      subject: "Seja Bem vindo a plataforma",
      body: '<p> Você ja pode fazer login na nossa plataforma'
    })

    return newUser;
  }
}