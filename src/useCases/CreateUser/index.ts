import { MailtrapMailProvider } from "../../providers/Implementations/MailtrapMailProvider";
import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { CreateUserControler } from "./CreateUserControler";
import { CreaterUserUseCase } from "./CreateUserUseCase";

const mailtrapProvider = new MailtrapMailProvider();
const userRepository = new UserRepository();

const createUserUseCase = new CreaterUserUseCase(userRepository, mailtrapProvider);

const createUserControler = new CreateUserControler(createUserUseCase);

export {
  createUserControler
};