import { Request, Response } from "express";
import { AcceptTradeProposalUseCase } from "./AcceptTradeProposalUseCase";

export class AcceptTradeProposalController {
  constructor(private acceptTradeProposalUseCase: AcceptTradeProposalUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { proposalId } = request.params;

    try {
      const acceptedProposal = await this.acceptTradeProposalUseCase.execute({
        proposalId,
      });
      return response.status(200).json(acceptedProposal);
    } catch (error) {
      return response
        .status(400)
        .json({ message: error.message || "Unexpected error" });
    }
  }
}
