import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { RefreshUserControler } from "./RefreshUserControler";
import { RefreshUserUseCase } from "./RefreshUserUseCase";
import { AuthTokenService } from "../../services/implementations/AuthTokenService";

const authTokenService = new AuthTokenService();

const userRepository = new UserRepository();

const refreshUserUseCase = new RefreshUserUseCase(
  userRepository,
  authTokenService
);

const refreshUserControler = new RefreshUserControler(refreshUserUseCase);

export { refreshUserControler };
