import { Request, Response } from "express";
import { GetUserTradeProposalsUseCase } from "./GetUserTradeProposalsUseCase";
import mongoose from "mongoose";

export class GetUserTradeProposalsController {
  constructor(
    private getUserTradeProposalsUseCase: GetUserTradeProposalsUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    try {
      const userTradeProposals =
        await this.getUserTradeProposalsUseCase.execute({
          userId: new mongoose.Types.ObjectId(userId),
        });

      return response.status(200).json(userTradeProposals);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
