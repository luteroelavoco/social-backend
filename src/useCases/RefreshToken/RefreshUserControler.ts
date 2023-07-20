import { Request, Response } from "express";
import { RefreshUserUseCase } from "./RefreshUserUseCase";

export class RefreshUserControler {
  constructor(
    private verifyUserUseCase: RefreshUserUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const email = request["email"];

    try {
      const user = await this.verifyUserUseCase.execute({
        email
      })

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error"
      })
    }
  }
}