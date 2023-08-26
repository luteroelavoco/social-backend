import { AcceptTradeProposalUseCase } from "./AcceptTradeProposalUseCase";
import { ITradeProposalRepository } from "../../repositories/ITradeProposalRepository";
import { TradeProposal } from "../../entities/TradeProposal";
import mongoose from "mongoose";

describe("Accept Trade Proposal Use Case", () => {
  it("should accept a trade proposal with valid data", async () => {
    const mockRepository: ITradeProposalRepository = {
      createTradeProposal: jest.fn(),
      acceptTradeProposal: jest.fn(),
      rejectTradeProposal: jest.fn(),
      getActiveTradeProposal: jest.fn(),
      getUserTradeProposals: jest.fn(),
      hasBookBeenTraded: jest.fn(),
    };

    const acceptTradeProposalUseCase = new AcceptTradeProposalUseCase(
      mockRepository
    );

    const proposalId = "64bccd2f82f180e5b645e375";
    const mockProposal = new TradeProposal({
      _id: new mongoose.Types.ObjectId(proposalId),
      fromUser: new mongoose.Types.ObjectId(),
      toUser: new mongoose.Types.ObjectId(),
      offeredBook: new mongoose.Types.ObjectId(),
      desiredBook: new mongoose.Types.ObjectId(),
      status: "pending",
    });

    mockRepository.acceptTradeProposal = jest
      .fn()
      .mockResolvedValue(mockProposal);

    const acceptedProposal = await acceptTradeProposalUseCase.execute({
      proposalId,
    });

    expect(acceptedProposal).toEqual(mockProposal);
    expect(mockRepository.acceptTradeProposal).toHaveBeenCalledWith(proposalId);
  });

  it("should throw an error if proposal is not found or already accepted", async () => {
    const mockRepository: ITradeProposalRepository = {
      createTradeProposal: jest.fn(),
      acceptTradeProposal: jest.fn(),
      rejectTradeProposal: jest.fn(),
      getActiveTradeProposal: jest.fn(),
      getUserTradeProposals: jest.fn(),
      hasBookBeenTraded: jest.fn(),
    };

    const acceptTradeProposalUseCase = new AcceptTradeProposalUseCase(
      mockRepository
    );

    const proposalId = "64bccd2f82f180e5b645e375";

    mockRepository.acceptTradeProposal = jest.fn().mockResolvedValue(null);

    await expect(
      acceptTradeProposalUseCase.execute({
        proposalId,
      })
    ).rejects.toThrowError("Proposal not found or already accepted.");

    expect(mockRepository.acceptTradeProposal).toHaveBeenCalledWith(proposalId);
  });
});
