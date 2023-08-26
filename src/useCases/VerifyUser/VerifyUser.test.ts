import { VerifyUserUseCase } from "./VerifyUserUseCase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IAuthTokenService } from "../../services/IAuthTokenService";
import { IVerifyUserRequestDTO } from "./VerifyUserDTO";
import { User } from "../../entities/User";

describe("VerifyUserUseCase", () => {
  const mockUsersRepository: IUserRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    verifyEmail: jest.fn(),
    authentication: jest.fn(),
  };

  const mockAuthTokenService: IAuthTokenService = {
    verifyToken: jest.fn(),
    generateToken: jest.fn(),
  };

  const verifyUserUseCase = new VerifyUserUseCase(
    mockUsersRepository,
    mockAuthTokenService
  );

  it("should verify user email and return the verified user", async () => {
    const email = "mock@example.com";
    const mockToken = "mockToken";
    const mockUser = new User({
      _id: "mockUserId",
      email,
      verified: false,
    });

    const mockRequestDTO: IVerifyUserRequestDTO = {
      token: mockToken,
    };

    mockAuthTokenService.verifyToken = jest.fn().mockReturnValue(mockToken);
    mockUsersRepository.findByEmail = jest.fn().mockResolvedValueOnce(mockUser);
    mockUsersRepository.verifyEmail = jest.fn().mockResolvedValueOnce({
      ...mockUser,
      verified: true,
    });

    await verifyUserUseCase.execute(mockRequestDTO);

    expect(mockAuthTokenService.verifyToken).toHaveBeenCalledWith(mockToken);
    expect(mockUsersRepository.verifyEmail).toHaveBeenCalledWith(mockToken);
  });

  it("should throw an error if token verification fails", async () => {
    const mockToken = "invalidToken";
    const mockRequestDTO: IVerifyUserRequestDTO = {
      token: mockToken,
    };

    mockAuthTokenService.verifyToken = jest.fn().mockImplementation(() => {
      throw new Error("Token verification failed");
    });

    await expect(
      verifyUserUseCase.execute(mockRequestDTO)
    ).rejects.toThrowError("Token verification failed");
  });

  it("should throw an error if user does not exist", async () => {
    const email = "nonexistent@example.com";
    const mockToken = "mockToken";
    const mockRequestDTO: IVerifyUserRequestDTO = {
      token: mockToken,
    };

    mockAuthTokenService.verifyToken = jest.fn().mockReturnValue(email);
    mockUsersRepository.findByEmail = jest.fn().mockResolvedValueOnce(null);

    await expect(
      verifyUserUseCase.execute(mockRequestDTO)
    ).rejects.toThrowError("User not exists.");
  });
});
