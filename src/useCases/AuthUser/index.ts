import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { AuthTokenService } from "../../services/implementations/AuthTokenService";
import { AuthUserControler } from "./AuthUserControler";
import { AuthUserUseCase } from "./AuthUserUseCase";

const userRepository = new UserRepository();
const authTokenService = new AuthTokenService();

const authUserUseCase = new AuthUserUseCase(userRepository, authTokenService);

const authUserControler = new AuthUserControler(authUserUseCase);

export {
  authUserControler
};