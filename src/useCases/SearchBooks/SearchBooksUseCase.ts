import { IBookRepository } from "../../repositories/IBookRepository";
import { ISearchBooksRequestDTO } from "./SearchBooksDTO";

export class SearchBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(data: ISearchBooksRequestDTO) {
    return this.bookRepository.searchBook(data.search);
  }
}
