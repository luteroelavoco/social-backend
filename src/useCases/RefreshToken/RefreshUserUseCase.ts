import { IUserRepository } from "../../repositories/IUserRepository";
import { IRefreshUserRequestDTO } from "./RefreshUserDTO";
import { IAuthTokenService } from "../../services/IAuthTokenService";

export class RefreshUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private authTokenService: IAuthTokenService
  ) {}
  async execute(data: IRefreshUserRequestDTO) {
    if (!data.email) {
      throw new Error("Invalid token");
    }
    const user = await this.usersRepository.findByEmail(data.email);
    const token = this.authTokenService.generateToken(user.email);
    return {
      user,
      token,
    };
  }
}
