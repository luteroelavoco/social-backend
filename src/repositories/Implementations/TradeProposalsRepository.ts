import mongoose from "mongoose";
import { ITradeProposalRepository } from "../ITradeProposalRepository";
import { TradeProposal } from "../../entities/TradeProposal";
import { TradeProposal as TradeProposalDatabase } from "../../models/TradeProposal";

export class TradeProposalRepository implements ITradeProposalRepository {
  async createTradeProposal(proposal: TradeProposal): Promise<TradeProposal> {
    const newProposal = await TradeProposalDatabase.create(proposal);
    return newProposal;
  }

  async acceptTradeProposal(proposalId: string): Promise<TradeProposal | null> {
    const acceptedProposal = await TradeProposalDatabase.findByIdAndUpdate(
      proposalId,
      { status: "accepted" },
      { new: true }
    )
      .populate("desiredBook")
      .populate("fromUser")
      .populate("toUser")
      .populate("offeredBook");
    return acceptedProposal ? acceptedProposal : null;
  }

  async rejectTradeProposal(proposalId: string): Promise<TradeProposal | null> {
    const rejectedProposal = await TradeProposalDatabase.findByIdAndUpdate(
      proposalId,
      { status: "rejected" },
      { new: true }
    )
      .populate("desiredBook")
      .populate("fromUser")
      .populate("toUser")
      .populate("offeredBook");
    return rejectedProposal ? rejectedProposal : null;
  }

  async getActiveTradeProposal(data): Promise<TradeProposal | null> {
    const { fromUser, toUser, offeredBook, desiredBook } = data;

    const activeProposal = await TradeProposalDatabase.findOne({
      fromUser,
      toUser,
      offeredBook,
      desiredBook,
    })
      .populate("desiredBook")
      .populate("fromUser")
      .populate("toUser")
      .populate("offeredBook");

    return activeProposal ? activeProposal : null;
  }

  async getUserTradeProposals(
    userId: mongoose.Types.ObjectId
  ): Promise<TradeProposal[]> {
    const userTradeProposals = await TradeProposalDatabase.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate("desiredBook")
      .populate("fromUser")
      .populate("toUser")
      .populate("offeredBook");

    return userTradeProposals;
  }

  async hasBookBeenTraded(bookId: mongoose.Types.ObjectId): Promise<boolean> {
    const tradedProposal = await TradeProposalDatabase.findOne({
      $or: [{ offeredBook: bookId }, { desiredBook: bookId }],
      status: "accepted",
    });

    return tradedProposal !== null;
  }
}
