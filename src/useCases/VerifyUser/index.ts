import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { VerifyUserController } from "./VerifyUserController";
import { VerifyUserUseCase } from "./VerifyUserUseCase";
import { AuthTokenService } from "../../services/implementations/AuthTokenService";

const userRepository = new UserRepository();
const authTokenService = new AuthTokenService();

const verifyUserUseCase = new VerifyUserUseCase(
  userRepository,
  authTokenService
);

const verifyUserController = new VerifyUserController(verifyUserUseCase);

export { verifyUserController };
