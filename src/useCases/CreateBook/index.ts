import { BookRepository } from "../../repositories/Implementations/BookRepository";
import { CreateBookController } from "./CreateBookController";
import { CreateBookUseCase } from "./CreateBookUseCase";

const bookRepository = new BookRepository();

const createBookUseCase = new CreateBookUseCase(bookRepository);

const createBookController = new CreateBookController(createBookUseCase);

export { createBookController };
