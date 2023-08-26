import { ITradeProposalRepository } from "../../repositories/ITradeProposalRepository";
import { IGetUserTradeProposalsRequestDTO } from "./GetUserTradeProposalsDTO";

export class GetUserTradeProposalsUseCase {
  constructor(private tradeProposalRepository: ITradeProposalRepository) {}

  async execute({ userId }: IGetUserTradeProposalsRequestDTO) {
    const userTradeProposals =
      await this.tradeProposalRepository.getUserTradeProposals(userId);
    return userTradeProposals;
  }
}
