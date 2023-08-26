import { ITradeProposalRepository } from "../../repositories/ITradeProposalRepository";
import { IAcceptTradeProposalRequestDTO } from "./AcceptTradeProposalDTO";

export class AcceptTradeProposalUseCase {
  constructor(private tradeProposalRepository: ITradeProposalRepository) {}

  async execute(data: IAcceptTradeProposalRequestDTO) {
    const acceptedProposal =
      await this.tradeProposalRepository.acceptTradeProposal(data.proposalId);
    if (!acceptedProposal) {
      throw new Error("Proposal not found or already accepted.");
    }
    return acceptedProposal;
  }
}
