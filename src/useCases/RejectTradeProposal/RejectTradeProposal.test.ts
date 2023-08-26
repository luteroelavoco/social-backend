import { RejectTradeProposalUseCase } from "./RejectTradeProposalUseCase";
import { ITradeProposalRepository } from "../../repositories/ITradeProposalRepository";
import { TradeProposal } from "../../entities/TradeProposal";
import mongoose from "mongoose";

describe("Reject Trade Proposal Use Case", () => {
  it("should reject a trade proposal with valid data", async () => {
    const mockRepository: ITradeProposalRepository = {
      createTradeProposal: jest.fn(),
      acceptTradeProposal: jest.fn(),
      rejectTradeProposal: jest.fn(),
      getActiveTradeProposal: jest.fn(),
      getUserTradeProposals: jest.fn(),
      hasBookBeenTraded: jest.fn(),
    };

    const rejectTradeProposalUseCase = new RejectTradeProposalUseCase(
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

    mockRepository.rejectTradeProposal = jest
      .fn()
      .mockResolvedValue(mockProposal);

    const rejectedProposal = await rejectTradeProposalUseCase.execute({
      proposalId,
    });

    expect(rejectedProposal).toEqual(mockProposal);
    expect(mockRepository.rejectTradeProposal).toHaveBeenCalledWith(proposalId);
  });
});
