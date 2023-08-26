import { CreateTradeProposalUseCase } from "./CreateTradeProposalUseCase";
import { ITradeProposalRepository } from "../../repositories/ITradeProposalRepository";
import { ICreateTradeProposalRequestDTO } from "./CreateTradeProposalDTO";
import { IBookRepository } from "../../repositories/IBookRepository";
import { TradeProposal } from "../../entities/TradeProposal";
import mongoose from "mongoose";

describe("Create Trade Proposal Use Case", () => {
  const mockBookRepository: IBookRepository = {
    findBookById: jest.fn(),
    searchBook: jest.fn(),
    availableBooks: jest.fn(),
    save: jest.fn(),
  };

  it("should create a new trade proposal", async () => {
    const mockCreateTradeProposal = jest.fn();

    const mockTradeProposalRepository: ITradeProposalRepository = {
      createTradeProposal: mockCreateTradeProposal,
      acceptTradeProposal: jest.fn(),
      rejectTradeProposal: jest.fn(),
      getActiveTradeProposal: jest.fn(),
      getUserTradeProposals: jest.fn(),
      hasBookBeenTraded: jest.fn(),
    };

    const createTradeProposalUseCase = new CreateTradeProposalUseCase(
      mockTradeProposalRepository,
      mockBookRepository
    );

    const createTradeProposalDTO: ICreateTradeProposalRequestDTO = {
      offeredBook: new mongoose.Types.ObjectId(),
      desiredBook: new mongoose.Types.ObjectId(),
    };

    const bookOwner = new mongoose.Types.ObjectId();
    mockBookRepository.findBookById = jest
      .fn()
      .mockResolvedValue({ owner: bookOwner });

    const createdTradeProposal = {
      offeredBook: createTradeProposalDTO.offeredBook,
      desiredBook: createTradeProposalDTO.desiredBook,
      status: "pending",
    };

    mockCreateTradeProposal.mockResolvedValue(createdTradeProposal);

    const result = await createTradeProposalUseCase.execute(
      createTradeProposalDTO
    );

    expect(result).toEqual(createdTradeProposal);
  });

  it("should throw an error if the offered book is already in an active trade", async () => {
    const mockTradeProposalRepository: ITradeProposalRepository = {
      createTradeProposal: jest.fn(),
      acceptTradeProposal: jest.fn(),
      rejectTradeProposal: jest.fn(),
      getActiveTradeProposal: jest.fn().mockResolvedValue({} as TradeProposal),
      getUserTradeProposals: jest.fn(),
      hasBookBeenTraded: jest.fn(),
    };

    const createTradeProposalUseCase = new CreateTradeProposalUseCase(
      mockTradeProposalRepository,
      mockBookRepository
    );

    const createTradeProposalDTO: ICreateTradeProposalRequestDTO = {
      offeredBook: new mongoose.Types.ObjectId(),
      desiredBook: new mongoose.Types.ObjectId(),
    };

    mockTradeProposalRepository.hasBookBeenTraded = jest
      .fn()
      .mockResolvedValue(true);

    await expect(
      createTradeProposalUseCase.execute(createTradeProposalDTO)
    ).rejects.toThrowError("This trade proposal is already created.");
  });
});
