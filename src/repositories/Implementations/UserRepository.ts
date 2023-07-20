import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { User as UserDatabase } from "../../models/User";
import bcrypt from "bcrypt";

export class UserRepository implements IUserRepository {

  async authentication(email: string, password: string): Promise<User> {

    const user = await UserDatabase.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password)))
      return undefined;

    user.password = undefined;
    return Object.assign(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await UserDatabase.findOne({ email });
  }

  async save(user: User): Promise<User> {
    const newUser = await UserDatabase.create(user);
    newUser.password = undefined;
    return Object.assign(newUser);
  }

  async update(user: Partial<User>): Promise<User> {
    const findedUser = await UserDatabase.findById(user._id);

    if (!UserDatabase) return undefined;

    findedUser.firstName = user.firstName;
    findedUser.lastName = user.lastName;
    findedUser.email = user.email;
    findedUser.address = user.address;
    findedUser.avatar = user.avatar;

    await findedUser.save();
    return Object.assign(findedUser);
  }

  async verifyEmail(email: string): Promise<User> {
    const findedUser = await UserDatabase.findOne({ email });

    if (!UserDatabase) return undefined;

    findedUser.verified = true;

    await findedUser.save();
    return Object.assign(findedUser);
  }
}