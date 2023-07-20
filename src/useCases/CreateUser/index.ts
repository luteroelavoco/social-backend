import { MailtrapMailProvider } from "../../providers/Implementations/MailtrapMailProvider";
import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { CreateUserControler } from "./CreateUserControler";
import { CreaterUserUseCase } from "./CreateUserUseCase";
import { AuthTokenService } from "../../services/implementations/AuthTokenService";

const mailtrapProvider = new MailtrapMailProvider();
const userRepository = new UserRepository();
const authTokenService = new AuthTokenService();

const createUserUseCase = new CreaterUserUseCase(userRepository, mailtrapProvider, authTokenService);

const createUserControler = new CreateUserControler(createUserUseCase);

export {
  createUserControler
};