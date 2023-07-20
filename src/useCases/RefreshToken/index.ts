import { UserRepository } from "../../repositories/Implementations/UserRepository";
import { RefreshUserControler } from "./RefreshUserControler";
import { RefreshUserUseCase } from "./RefreshUserUseCase";

const userRepository = new UserRepository();

const refreshUserUseCase = new RefreshUserUseCase(userRepository);

const refreshUserControler = new RefreshUserControler(refreshUserUseCase);

export {
  refreshUserControler
};