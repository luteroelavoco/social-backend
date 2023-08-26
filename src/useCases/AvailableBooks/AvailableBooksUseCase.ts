import { IBookRepository } from "../../repositories/IBookRepository";
import { IAvailableBooksRequestDTO } from "./AvailableBooksDTO";

export class AvailableBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(data: IAvailableBooksRequestDTO) {
    return this.bookRepository.availableBooks(data.search);
  }
}
