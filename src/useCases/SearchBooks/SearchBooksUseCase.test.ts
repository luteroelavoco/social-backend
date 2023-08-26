import { SearchBooksUseCase } from "./SearchBooksUseCase";
import { IBookRepository } from "../../repositories/IBookRepository";
import { ISearchBooksRequestDTO } from "./SearchBooksDTO";
import { Book } from "../../entities/Book";
import mongoose from "mongoose";

describe("SearchBooksUseCase", () => {
  it("should fetch books based on search", async () => {
    const fakeBookRepository: IBookRepository = {
      searchBook: jest.fn(),
      availableBooks: jest.fn(),
      save: jest.fn(),
      findBookById: jest.fn(),
    };

    const searchBooksUseCase = new SearchBooksUseCase(fakeBookRepository);

    const searchQuery = "sample query";

    const mockSearchResults: Book[] = [
      {
        _id: new mongoose.Types.ObjectId(),
        title: "Book 1",
        author: "Author 1",
        avatar: "avatar1.jpg",
        description: "Description 1",
        owner: new mongoose.Types.ObjectId(),
      },
    ];

    fakeBookRepository.searchBook = jest
      .fn()
      .mockResolvedValue(mockSearchResults);

    const requestDTO: ISearchBooksRequestDTO = {
      search: searchQuery,
    };

    const result = await searchBooksUseCase.execute(requestDTO);

    expect(result).toEqual(mockSearchResults);
    expect(fakeBookRepository.searchBook).toHaveBeenCalledWith(searchQuery);
  });

  it("should return an empty array if no search results are found", async () => {
    const fakeBookRepository: IBookRepository = {
      searchBook: jest.fn(),
      availableBooks: jest.fn(),
      save: jest.fn(),
      findBookById: jest.fn(),
    };

    const searchBooksUseCase = new SearchBooksUseCase(fakeBookRepository);

    const searchQuery = "nonexistent";

    const mockSearchResults: Book[] = [];

    fakeBookRepository.searchBook = jest
      .fn()
      .mockResolvedValue(mockSearchResults);

    const requestDTO: ISearchBooksRequestDTO = {
      search: searchQuery,
    };

    const result = await searchBooksUseCase.execute(requestDTO);

    expect(result).toEqual([]);
    expect(fakeBookRepository.searchBook).toHaveBeenCalledWith(searchQuery);
  });
});
