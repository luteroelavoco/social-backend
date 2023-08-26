import { Request, Response } from "express";
import { CreateTradeProposalUseCase } from "./CreateTradeProposalUseCase";
import { ICreateTradeProposalRequestDTO } from "./CreateTradeProposalDTO";

export class CreateTradeProposalController {
  constructor(private createTradeProposalUseCase: CreateTradeProposalUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { offeredBook, desiredBook } = request.body;

    const data: ICreateTradeProposalRequestDTO = {
      offeredBook,
      desiredBook,
    };

    try {
      const createdProposal = await this.createTradeProposalUseCase.execute(
        data
      );

      return response.status(201).json(createdProposal);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error",
      });
    }
  }
}
