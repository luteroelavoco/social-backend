import mongoose from "mongoose";
import { Book } from "../entities/Book";

export interface IBookRepository {
  findBookById(id: mongoose.Types.ObjectId): Promise<Book>;
  searchBook(search: string): Promise<Book[]>;
  availableBooks(search: string): Promise<Book[]>;
  save(book: Book): Promise<Book>;
}
