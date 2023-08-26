import { Book } from "../../entities/Book";
import { IBookRepository } from "../../repositories/IBookRepository";
import { ICreateBookRequestDTO } from "./CreateBookDTO";

export class CreateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(data: ICreateBookRequestDTO): Promise<Book> {
    const { title, author, description, owner, avatar } = data;

    const book = new Book({
      title,
      author,
      description,
      owner,
      avatar,
    });

    const newBook = await this.bookRepository.save(book);

    return newBook;
  }
}
