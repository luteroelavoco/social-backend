import { IUserRepository } from "../../repositories/IUserRepository";
import { IVerifyUserRequestDTO } from "./VerifyUserDTO";
import { IAuthTokenService } from "../../services/IAuthTokenService";


export class VerifyUserUseCase {

  constructor(
    private usersRepository: IUserRepository,
    private authTokenService: IAuthTokenService,
  ) {

  }
  async execute(data: IVerifyUserRequestDTO) {
    const decodedEmail = this.authTokenService.verifyToken(data.token);

    if (!decodedEmail) {
      throw new Error('Invalid token');
    }

    const updatedUser = await this.usersRepository.verifyEmail(decodedEmail);

    if (!updatedUser) {
      throw new Error('User not exists.');
    }

    return updatedUser;
  }
}