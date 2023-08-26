import mongoose from "mongoose";

export interface ICreateTradeProposalRequestDTO {
  offeredBook: mongoose.Types.ObjectId;
  desiredBook: mongoose.Types.ObjectId;
}
