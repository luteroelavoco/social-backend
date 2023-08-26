import { AvailableBooksUseCase } from "./AvailableBooksUseCase";
import { IBookRepository } from "../../repositories/IBookRepository";
import { IAvailableBooksRequestDTO } from "./AvailableBooksDTO";
import { Book } from "../../entities/Book";

describe("AvailableBooksUseCase", () => {
  it("should return an empty array if no available books match the search", async () => {
    const fakeBookRepository: IBookRepository = {
      searchBook: jest.fn(),
      availableBooks: jest.fn(),
      save: jest.fn(),
      findBookById: jest.fn(),
    };

    const availableBooksUseCase = new AvailableBooksUseCase(fakeBookRepository);

    const searchQuery = "nonexistent";

    const mockAvailableBooks: Book[] = [];

    fakeBookRepository.availableBooks = jest
      .fn()
      .mockResolvedValue(mockAvailableBooks);

    const requestDTO: IAvailableBooksRequestDTO = {
      search: searchQuery,
    };

    const result = await availableBooksUseCase.execute(requestDTO);

    expect(result).toEqual([]);
    expect(fakeBookRepository.availableBooks).toHaveBeenCalledWith(searchQuery);
  });
});
