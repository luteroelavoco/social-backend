import { BookRepository } from "../../repositories/Implementations/BookRepository";
import { AvailableBooksController } from "./AvailableBooksController";
import { AvailableBooksUseCase } from "./AvailableBooksUseCase";

const bookRepository = new BookRepository();
const availableBooksUseCase = new AvailableBooksUseCase(bookRepository);
const availableBooksController = new AvailableBooksController(
  availableBooksUseCase
);

export { availableBooksController };
