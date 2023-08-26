import { Request, Response } from "express";
import { CreateBookUseCase } from "./CreateBookUseCase";

export class CreateBookController {
  constructor(private createBookUseCase: CreateBookUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, author, description, owner, avatar } = request.body;
    try {
      const book = await this.createBookUseCase.execute({
        title,
        author,
        description,
        owner,
        avatar,
      });

      return response.status(201).json(book);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error",
      });
    }
  }
}
