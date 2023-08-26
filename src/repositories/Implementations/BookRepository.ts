import { Book } from "../../entities/Book";
import { IBookRepository } from "../IBookRepository";
import { Book as BookDatabase } from "../../models/Book";
import { TradeProposal } from "../../models/TradeProposal";
import mongoose from "mongoose";

export class BookRepository implements IBookRepository {
  async findBookById(id: mongoose.Types.ObjectId): Promise<Book> {
    const book = await BookDatabase.findById(id);
    return book;
  }

  async searchBook(search: string): Promise<Book[]> {
    const books = await BookDatabase.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    }).populate("owner");

    return books;
  }

  async availableBooks(search: string): Promise<Book[]> {
    const acceptedTradeProposals = await TradeProposal.find({
      status: "accepted",
    });
    const acceptedOfferedBookIds = [];

    acceptedTradeProposals.map((proposal) => {
      acceptedOfferedBookIds.push(proposal.offeredBook);
      acceptedOfferedBookIds.push(proposal.offeredBook);
    });

    const availableBooks = await BookDatabase.find({
      _id: { $nin: acceptedOfferedBookIds },
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    }).populate("owner");

    return availableBooks;
  }

  async save(book: Book): Promise<Book> {
    const newBook = (await BookDatabase.create(book)).populate("owner");
    return newBook;
  }
}
