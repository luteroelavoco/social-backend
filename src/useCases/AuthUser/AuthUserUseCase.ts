import { IUserRepository } from "../../repositories/IUserRepository";
import { IAuthTokenService } from "../../services/IAuthTokenService";
import { IAuthUserRequestDTO } from "./AuthUserDTO";

export class AuthUserUseCase {

  constructor(
    private usersRepository: IUserRepository,
    private authTokenService: IAuthTokenService
  ) {

  }
  async execute(data: IAuthUserRequestDTO) {
    const authUser = await this.usersRepository.authentication(data.email, data.password);

    if (!authUser) {
      throw new Error('User not exists or invalid password.');
    }

    if (!authUser.verified) {
      throw new Error('User did not verify the email');
    }

    const token = this.authTokenService.generateToken(data.email)
    return {
      user: authUser,
      token
    }

  }
}