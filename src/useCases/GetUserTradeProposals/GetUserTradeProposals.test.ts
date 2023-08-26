import { GetUserTradeProposalsController } from "./GetUserTradeProposalsController";
import { GetUserTradeProposalsUseCase } from "./GetUserTradeProposalsUseCase";
import { ITradeProposalRepository } from "../../repositories/ITradeProposalRepository";
import { TradeProposal } from "../../entities/TradeProposal";
import mongoose from "mongoose";

describe("Get User Trade Proposals Controller", () => {
  it("should get trade proposals for a user", async () => {
    const mockTradeProposalRepository: ITradeProposalRepository = {
      createTradeProposal: jest.fn(),
      acceptTradeProposal: jest.fn(),
      rejectTradeProposal: jest.fn(),
      getActiveTradeProposal: jest.fn(),
      getUserTradeProposals: jest.fn().mockResolvedValue([
        new TradeProposal({
          _id: new mongoose.Types.ObjectId(),
          fromUser: new mongoose.Types.ObjectId(),
          toUser: new mongoose.Types.ObjectId(),
          offeredBook: new mongoose.Types.ObjectId(),
          desiredBook: new mongoose.Types.ObjectId(),
          status: "pending",
        }),
      ]),
      hasBookBeenTraded: jest.fn(),
    };

    const getUserTradeProposalsUseCase = new GetUserTradeProposalsUseCase(
      mockTradeProposalRepository
    );

    const getUserTradeProposalsController = new GetUserTradeProposalsController(
      getUserTradeProposalsUseCase
    );

    const request = {
      params: {
        userId: new mongoose.Types.ObjectId().toString(),
      },
    };

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUserTradeProposalsController.handle(
      request as any,
      response as any
    );

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalled();
  });
});
