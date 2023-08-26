import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";
import { User } from "../../entities/User";

describe("UpdateUserUseCase", () => {
  const mockUsersRepository: IUserRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    verifyEmail: jest.fn(),
    authentication: jest.fn(),
  };

  const updateUserUseCase = new UpdateUserUseCase(mockUsersRepository);

  it("should update user and return the updated user", async () => {
    const email = "test@gmail.com";
    const updatedUserData: IUpdateUserRequestDTO = {
      _id: "123,",
      firstName: "John",
      lastName: "Doe",
      password: "newPassword",
      address: {
        state: "CA",
        city: "Los Angeles",
        street: "123 Main St",
        number: 456,
        complement: "Apt 789",
        cep: "12345",
        neighborhood: "Downtown",
      },
    };

    const existingUser = new User({
      _id: "123",
      firstName: "Old First Name",
      lastName: "Old Last Name",
      password: "oldPassword",
      email: "test@gmail.com",
      address: {
        state: "CA",
        city: "Los Angeles",
        street: "123 Old St",
        number: 789,
        complement: "Unit 012",
        cep: "54321",
        neighborhood: "Old Town",
      },
    });

    mockUsersRepository.findByEmail = jest
      .fn()
      .mockResolvedValueOnce(existingUser);
    mockUsersRepository.update = jest
      .fn()
      .mockResolvedValueOnce(updatedUserData);

    const updatedUser = await updateUserUseCase.execute(updatedUserData);

    expect(mockUsersRepository.update).toHaveBeenCalledWith(updatedUserData);
    expect(updatedUser).toEqual(updatedUserData);
  });

  it("should throw an error if user does not exist", async () => {
    const email = "nonExistentUserEmail";
    const updatedUserData: IUpdateUserRequestDTO = {
      _id: "1223",
      firstName: "John",
      lastName: "Doe",
      password: "newPassword",
      address: {
        state: "CA",
        city: "Los Angeles",
        street: "123 Main St",
        number: 456,
        complement: "Apt 789",
        cep: "12345",
        neighborhood: "Downtown",
      },
    };

    mockUsersRepository.findByEmail = jest.fn().mockResolvedValueOnce(null);

    await expect(
      updateUserUseCase.execute(updatedUserData)
    ).rejects.toThrowError("User not exists.");
  });
});
