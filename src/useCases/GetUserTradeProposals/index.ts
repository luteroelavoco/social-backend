import { GetUserTradeProposalsUseCase } from "./GetUserTradeProposalsUseCase";
import { GetUserTradeProposalsController } from "./GetUserTradeProposalsController";
import { TradeProposalRepository } from "../../repositories/Implementations/TradeProposalsRepository";

const tradeProposalRepository = new TradeProposalRepository();
const getUserTradeProposalsUseCase = new GetUserTradeProposalsUseCase(
  tradeProposalRepository
);
const getUserTradeProposalsController = new GetUserTradeProposalsController(
  getUserTradeProposalsUseCase
);

export { getUserTradeProposalsController };
