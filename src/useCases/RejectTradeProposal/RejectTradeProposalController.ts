import { Request, Response } from "express";
import { RejectTradeProposalUseCase } from "./RejectTradeProposalUseCase";

export class RejectTradeProposalController {
  constructor(private rejectTradeProposalUseCase: RejectTradeProposalUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { proposalId } = request.params;

    try {
      const rejectedProposal = await this.rejectTradeProposalUseCase.execute({
        proposalId,
      });
      return response.status(200).json(rejectedProposal);
    } catch (error) {
      return response
        .status(400)
        .json({ message: error.message || "Unexpected error" });
    }
  }
}
