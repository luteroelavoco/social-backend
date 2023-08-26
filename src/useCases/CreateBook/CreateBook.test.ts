import { CreateBookUseCase } from "./CreateBookUseCase";
import { IBookRepository } from "../../repositories/IBookRepository";
import { ICreateBookRequestDTO } from "./CreateBookDTO";
import { Book } from "../../entities/Book";
import mongoose from "mongoose";

describe("CreateBookUseCase", () => {
  it("should create a new book", async () => {
    const fakeBookRepository: IBookRepository = {
      save: jest.fn(),
      searchBook: jest.fn(),
      availableBooks: jest.fn(),
      findBookById: jest.fn(),
    };

    const createBookUseCase = new CreateBookUseCase(fakeBookRepository);
    const validOwnerId = new mongoose.Types.ObjectId();

    const createBookDTO: ICreateBookRequestDTO = {
      title: "Example Book",
      author: "John Doe",
      description: "A sample book",
      owner: validOwnerId,
      avatar: "path/to/avatar",
    };

    const validBookId = new mongoose.Types.ObjectId();
    const createdBook: Book = {
      _id: validBookId,
      ...createBookDTO,
    };

    fakeBookRepository.save = jest.fn().mockResolvedValue(createdBook);

    const newBook = await createBookUseCase.execute(createBookDTO);

    expect(newBook).toEqual(createdBook);
    expect(fakeBookRepository.save).toHaveBeenCalledWith(
      expect.objectContaining(createBookDTO)
    );
  });
});
