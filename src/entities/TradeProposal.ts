import mongoose from "mongoose";
import { User } from "./User";
import { Book } from "./Book";

class TradeProposal {
  public _id?: mongoose.Types.ObjectId;
  public fromUser: mongoose.Types.ObjectId | User;
  public toUser: mongoose.Types.ObjectId | User;
  public offeredBook: mongoose.Types.ObjectId | Book;
  public desiredBook: mongoose.Types.ObjectId | Book;
  public status?: "pending" | "accepted" | "rejected";
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Partial<TradeProposal>) {
    Object.assign(this, props);
  }
}

export { TradeProposal };
