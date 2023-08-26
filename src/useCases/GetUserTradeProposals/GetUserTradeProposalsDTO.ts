import mongoose from "mongoose";

export interface IGetUserTradeProposalsRequestDTO {
  userId: mongoose.Types.ObjectId;
}
