import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { AuthTokenService } from "../../services/implementations/AuthTokenService";
import { AuthUserController } from "./AuthUserController";
import { AuthUserUseCase } from "./AuthUserUseCase";

const userRepository = new UserRepository();
const authTokenService = new AuthTokenService();

const authUserUseCase = new AuthUserUseCase(userRepository, authTokenService);

const authUserController = new AuthUserController(authUserUseCase);

export { authUserController };
