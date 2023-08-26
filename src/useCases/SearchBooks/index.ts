import { BookRepository } from "../../repositories/Implementations/BookRepository";
import { SearchBooksController } from "./SearchBooksController";
import { SearchBooksUseCase } from "./SearchBooksUseCase";

const bookRepository = new BookRepository();
const searchBooksUseCase = new SearchBooksUseCase(bookRepository);
const searchBooksController = new SearchBooksController(searchBooksUseCase);

export { searchBooksController };
