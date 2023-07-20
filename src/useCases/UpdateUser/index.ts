import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { UpdateUserControler } from "./UpdateUserControler";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const userRepository = new UserRepository();

const updateUserUseCase = new UpdateUserUseCase(userRepository);

const updateUserControler = new UpdateUserControler(updateUserUseCase);

export {
  updateUserControler
};