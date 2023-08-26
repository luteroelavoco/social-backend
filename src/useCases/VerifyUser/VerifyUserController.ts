import { Request, Response } from "express";
import { VerifyUserUseCase } from "./VerifyUserUseCase";

export class VerifyUserController {
  constructor(private verifyUserUseCase: VerifyUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    try {
      const userWithToken = await this.verifyUserUseCase.execute({
        token,
      });

      return response.status(200).json(userWithToken);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error",
      });
    }
  }
}
