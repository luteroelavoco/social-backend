import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { RefreshUserController } from "./RefreshUserController";
import { RefreshUserUseCase } from "./RefreshUserUseCase";
import { AuthTokenService } from "../../services/implementations/AuthTokenService";

const authTokenService = new AuthTokenService();

const userRepository = new UserRepository();

const refreshUserUseCase = new RefreshUserUseCase(
  userRepository,
  authTokenService
);

const refreshUserController = new RefreshUserController(refreshUserUseCase);

export { refreshUserController };
