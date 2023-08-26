import mongoose from "mongoose";
import { TradeProposal } from "../entities/TradeProposal";

interface IGetActiveTradeProposalInterface {
  fromUser: mongoose.Types.ObjectId;
  toUser: mongoose.Types.ObjectId;
  offeredBook: mongoose.Types.ObjectId;
  desiredBook: mongoose.Types.ObjectId;
}

export interface ITradeProposalRepository {
  createTradeProposal(proposal: TradeProposal): Promise<TradeProposal>;
  acceptTradeProposal(proposalId: string): Promise<TradeProposal | null>;
  rejectTradeProposal(proposalId: string): Promise<TradeProposal | null>;
  getActiveTradeProposal(
    data: IGetActiveTradeProposalInterface
  ): Promise<TradeProposal | null>;
  getUserTradeProposals(
    userId: mongoose.Types.ObjectId
  ): Promise<TradeProposal[]>;
  hasBookBeenTraded(bookId: mongoose.Types.ObjectId): Promise<boolean>;
}
