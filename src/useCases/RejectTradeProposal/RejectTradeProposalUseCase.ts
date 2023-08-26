import { ITradeProposalRepository } from "../../repositories/ITradeProposalRepository";
import { IRejectTradeProposalRequestDTO } from "./RejectTradeProposalDTO";

export class RejectTradeProposalUseCase {
  constructor(private tradeProposalRepository: ITradeProposalRepository) {}

  async execute(data: IRejectTradeProposalRequestDTO) {
    const rejectedProposal =
      await this.tradeProposalRepository.rejectTradeProposal(data.proposalId);
    if (!rejectedProposal) {
      throw new Error("Proposal not found or already rejected.");
    }
    return rejectedProposal;
  }
}
