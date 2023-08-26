import { CreaterUserUseCase } from "./CreateUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IMailProvider } from "../../providers/IMailProvider";
import { IAuthTokenService } from "../../services/IAuthTokenService";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";

describe("CreateUserUseCase", () => {
  const mockUsersRepository: IUserRepository = {
    authentication: jest.fn(),
    findByEmail: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    verifyEmail: jest.fn(),
  };

  const mockMailProvider: IMailProvider = {
    sendEmail: jest.fn(),
  };

  const mockAuthTokenService: IAuthTokenService = {
    generateToken: jest.fn(),
    verifyToken: jest.fn(),
  };

  const createUserUseCase = new CreaterUserUseCase(
    mockUsersRepository,
    mockMailProvider,
    mockAuthTokenService
  );

  it("should create a new user successfully", async () => {
    const requestDTO: ICreateUserRequestDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    mockUsersRepository.findByEmail = jest.fn().mockReturnValueOnce(null);
    mockUsersRepository.save = jest
      .fn()
      .mockResolvedValueOnce(new User(requestDTO));

    const result = await createUserUseCase.execute(requestDTO);

    expect(result).toBeDefined();
    expect(result.email).toBe(requestDTO.email);
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
      requestDTO.email
    );
    expect(mockUsersRepository.save).toHaveBeenCalledWith(expect.any(User));
    expect(mockMailProvider.sendEmail).toHaveBeenCalled();
  });

  it("should throw an error if user already exists", async () => {
    const requestDTO: ICreateUserRequestDTO = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    mockUsersRepository.findByEmail = jest
      .fn()
      .mockResolvedValueOnce(new User(requestDTO));

    await expect(createUserUseCase.execute(requestDTO)).rejects.toThrowError(
      "User already exists."
    );
  });
});
