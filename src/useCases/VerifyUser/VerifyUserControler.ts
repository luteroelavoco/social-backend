import { Request, Response } from "express";
import { VerifyUserUseCase } from "./VerifyUserUseCase";

export class VerifyUserControler {
  constructor(
    private verifyUserUseCase: VerifyUserUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    try {
      const user = await this.verifyUserUseCase.execute({
        token
      })

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error"
      })
    }
  }
}