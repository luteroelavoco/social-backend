import { Request, Response } from "express";
import { AvailableBooksUseCase } from "./AvailableBooksUseCase";
import { IAvailableBooksRequestDTO } from "./AvailableBooksDTO";

export class AvailableBooksController {
  constructor(private availableBooksUseCase: AvailableBooksUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;
    
    const data: IAvailableBooksRequestDTO = {
      search: search as string,
    };

    try {
      const availableBooks = await this.availableBooksUseCase.execute(data);

      return response.status(200).json(availableBooks);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error",
      });
    }
  }
}
