import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { VerifyUserControler } from "./VerifyUserControler";
import { VerifyUserUseCase } from "./VerifyUserUseCase";
import { AuthTokenService } from "../../services/implementations/AuthTokenService";


const userRepository = new UserRepository();
const authTokenService = new AuthTokenService();

const verifyUserUseCase = new VerifyUserUseCase(userRepository, authTokenService);

const verifyUserControler = new VerifyUserControler(verifyUserUseCase);

export {
  verifyUserControler
};