import { Request, Response } from "express";
import { SearchBooksUseCase } from "./SearchBooksUseCase";
import { ISearchBooksRequestDTO } from "./SearchBooksDTO";

export class SearchBooksController {
  constructor(private searchBooksUseCase: SearchBooksUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;

    const data: ISearchBooksRequestDTO = {
      search: search as string,
    };

    try {
      const searchResults = await this.searchBooksUseCase.execute(data);

      return response.status(200).json(searchResults);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error",
      });
    }
  }
}
