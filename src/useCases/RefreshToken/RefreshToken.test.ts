import { RefreshUserUseCase } from "./RefreshUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IAuthTokenService } from "../../services/IAuthTokenService";
import { IRefreshUserRequestDTO } from "./RefreshUserDTO";
import { User } from "../../entities/User";

describe("RefreshUserUseCase", () => {
  const mockUsersRepository: IUserRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    verifyEmail: jest.fn(),
    authentication: jest.fn(),
  };

  const mockAuthTokenService: IAuthTokenService = {
    generateToken: jest.fn(),
    verifyToken: jest.fn(),
  };

  const refreshUserUseCase = new RefreshUserUseCase(
    mockUsersRepository,
    mockAuthTokenService
  );

  it("should throw an error if email is missing", async () => {
    const requestDTO: IRefreshUserRequestDTO = {
      email: "",
    };

    await expect(refreshUserUseCase.execute(requestDTO)).rejects.toThrowError(
      "Invalid token"
    );
  });

  it("should return user and token on successful refresh", async () => {
    const email = "johndoe@example.com";
    const user = new User({
      _id: "mockUserId",
      email: "johndoe@example.com",
      password: "hashedPassword",
      verified: true,
    });

    mockUsersRepository.findByEmail = jest.fn().mockResolvedValueOnce(user);
    mockAuthTokenService.generateToken = jest.fn().mockReturnValue("mockToken");

    const requestDTO: IRefreshUserRequestDTO = {
      email,
    };

    const result = await refreshUserUseCase.execute(requestDTO);

    expect(result.user).toEqual(user);
    expect(result.token).toBe("mockToken");
  });

  it("should return user and token on successful refresh", async () => {
    const email = "johndoe@example.com";
    const user = new User({
      _id: "mockUserId",
      email: "johndoe@example.com",
      password: "hashedPassword",
      verified: true,
    });

    mockUsersRepository.findByEmail = jest.fn().mockResolvedValueOnce(user);
    mockAuthTokenService.generateToken = jest.fn().mockReturnValue("mockToken");

    const requestDTO: IRefreshUserRequestDTO = {
      email,
    };

    const result = await refreshUserUseCase.execute(requestDTO);

    expect(result.user).toEqual(user);
    expect(result.token).toBe("mockToken");
  });

  it("should return user and token when user exists but is not verified", async () => {
    const email = "johndoe@example.com";
    const user = new User({
      _id: "mockUserId",
      email: "johndoe@example.com",
      password: "hashedPassword",
      verified: false,
    });

    mockUsersRepository.findByEmail = jest.fn().mockResolvedValueOnce(user);
    mockAuthTokenService.generateToken = jest.fn().mockReturnValue("mockToken");

    const requestDTO: IRefreshUserRequestDTO = {
      email,
    };

    const result = await refreshUserUseCase.execute(requestDTO);

    expect(result.user).toEqual(user);
    expect(result.token).toBe("mockToken");
  });

  it("should return user and token when user exists and token generation succeeds", async () => {
    const email = "johndoe@example.com";
    const user = new User({
      _id: "mockUserId",
      email: "johndoe@example.com",
      password: "hashedPassword",
      verified: true,
    });

    mockUsersRepository.findByEmail = jest.fn().mockResolvedValueOnce(user);
    mockAuthTokenService.generateToken = jest.fn().mockReturnValue("mockToken");

    const requestDTO: IRefreshUserRequestDTO = {
      email,
    };

    const result = await refreshUserUseCase.execute(requestDTO);

    expect(result.user).toEqual(user);
    expect(result.token).toBe("mockToken");
  });
});
