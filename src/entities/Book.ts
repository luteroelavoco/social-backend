import mongoose from "mongoose";

export class Book {
  public _id?: mongoose.Types.ObjectId;
  public title: string;
  public author?: string;
  public description?: string;
  public avatar?: string;
  public owner: mongoose.Types.ObjectId;

  constructor(props: Partial<Book>) {
    Object.assign(this, props);
  }
}
