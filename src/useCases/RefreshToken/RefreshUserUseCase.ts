import { IUserRepository } from "../../repositories/IUserRepository";
import { IRefreshUserRequestDTO } from "./RefreshUserDTO";


export class RefreshUserUseCase {

  constructor(
    private usersRepository: IUserRepository,
  ) {

  }
  async execute(data: IRefreshUserRequestDTO) {

    if (!data.email) {
      throw new Error('Invalid token');
    }

    const user = await this.usersRepository.findByEmail(data.email);

    return user;
  }
}