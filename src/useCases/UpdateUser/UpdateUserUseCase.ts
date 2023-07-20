import { IUserRepository } from "../../repositories/IUserRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";
export class UpdateUserUseCase {

  constructor(
    private usersRepository: IUserRepository,
  ) {

  }
  async execute(data: IUpdateUserRequestDTO) {
    const updatedUser = await this.usersRepository.update(data);

    if (!updatedUser) {
      throw new Error('User not exists.');
    }

    return updatedUser;
  }
}