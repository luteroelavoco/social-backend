import { User } from "../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  authentication(email: string, password: string): Promise<User>;
  verifyEmail(email: string): Promise<User>;
}