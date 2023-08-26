import mongoose from "mongoose";

export interface ICreateBookRequestDTO {
  title: string;
  author: string;
  description?: string;
  avatar?: string;
  owner: mongoose.Types.ObjectId;
}
