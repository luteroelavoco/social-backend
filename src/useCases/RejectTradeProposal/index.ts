import { RejectTradeProposalUseCase } from "./RejectTradeProposalUseCase";
import { RejectTradeProposalController } from "./RejectTradeProposalController";
import { TradeProposalRepository } from "../../repositories/Implementations/TradeProposalsRepository";

const tradeProposalRepository = new TradeProposalRepository();
const rejectTradeProposalUseCase = new RejectTradeProposalUseCase(
  tradeProposalRepository
);
const rejectTradeProposalController = new RejectTradeProposalController(
  rejectTradeProposalUseCase
);

export { rejectTradeProposalController };
