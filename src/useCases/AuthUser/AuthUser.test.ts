import { AuthUserUseCase } from "./AuthUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IAuthTokenService } from "../../services/IAuthTokenService";
import { IAuthUserRequestDTO } from "./AuthUserDTO";
import { User } from "../../entities/User";

describe("AuthUserUseCase", () => {
  it("should authenticate a user and return a token", async () => {
    const mockUserRepository: IUserRepository = {
      authentication: jest.fn().mockResolvedValueOnce({
        _id: "mockUserId",
        email: "mock@example.com",
        password: "hashedPassword",
        verified: true,
      } as User),
      save: jest.fn(),
      update: jest.fn(),
      verifyEmail: jest.fn(),
      findByEmail: jest.fn(),
    };

    const mockAuthTokenService: IAuthTokenService = {
      generateToken: jest.fn().mockReturnValue("mockToken"),
      verifyToken: jest.fn(),
    };

    const authUserUseCase = new AuthUserUseCase(
      mockUserRepository,
      mockAuthTokenService
    );

    const requestDTO: IAuthUserRequestDTO = {
      email: "mock@example.com",
      password: "plainTextPassword",
    };

    const result = await authUserUseCase.execute(requestDTO);

    expect(result.user).toBeDefined();
    expect(result.token).toBe("mockToken");
  });

  it("should throw an error if user does not exist", async () => {
    const mockUserRepository: IUserRepository = {
      authentication: jest.fn().mockResolvedValueOnce(null),
      save: jest.fn(),
      update: jest.fn(),
      verifyEmail: jest.fn(),
      findByEmail: jest.fn(),
    };

    const authUserUseCase = new AuthUserUseCase(
      mockUserRepository,
      {} as IAuthTokenService
    );

    const requestDTO: IAuthUserRequestDTO = {
      email: "nonexistent@example.com",
      password: "somePassword",
    };

    await expect(authUserUseCase.execute(requestDTO)).rejects.toThrowError(
      "User not exists or invalid password."
    );
  });

  it("should throw an error if user is not verified", async () => {
    const mockUserRepository: IUserRepository = {
      authentication: jest.fn().mockResolvedValueOnce({
        _id: "mockUserId",
        email: "mock@example.com",
        password: "hashedPassword",
        verified: false,
      } as User),
      save: jest.fn(),
      update: jest.fn(),
      verifyEmail: jest.fn(),
      findByEmail: jest.fn(),
    };

    const authUserUseCase = new AuthUserUseCase(
      mockUserRepository,
      {} as IAuthTokenService
    );

    const requestDTO: IAuthUserRequestDTO = {
      email: "mock@example.com",
      password: "plainTextPassword",
    };

    await expect(authUserUseCase.execute(requestDTO)).rejects.toThrowError(
      "User did not verify the email"
    );
  });

  it("should throw an error if user's password is incorrect", async () => {
    const mockUserRepository: IUserRepository = {
      authentication: jest.fn().mockResolvedValueOnce(null),
      save: jest.fn(),
      update: jest.fn(),
      verifyEmail: jest.fn(),
      findByEmail: jest.fn(),
    };

    const authUserUseCase = new AuthUserUseCase(
      mockUserRepository,
      {} as IAuthTokenService
    );

    const requestDTO: IAuthUserRequestDTO = {
      email: "mock@example.com",
      password: "incorrectPassword",
    };

    await expect(authUserUseCase.execute(requestDTO)).rejects.toThrowError(
      "User not exists or invalid password."
    );
  });

  it("should throw an error if repository throws an error", async () => {
    const mockUserRepository: IUserRepository = {
      authentication: jest
        .fn()
        .mockRejectedValueOnce(new Error("Repository error")),
      save: jest.fn(),
      update: jest.fn(),
      verifyEmail: jest.fn(),
      findByEmail: jest.fn(),
    };

    const authUserUseCase = new AuthUserUseCase(
      mockUserRepository,
      {} as IAuthTokenService
    );

    const requestDTO: IAuthUserRequestDTO = {
      email: "mock@example.com",
      password: "plainTextPassword",
    };

    await expect(authUserUseCase.execute(requestDTO)).rejects.toThrowError(
      "Repository error"
    );
  });
});
