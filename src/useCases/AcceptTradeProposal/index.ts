import { AcceptTradeProposalUseCase } from "./AcceptTradeProposalUseCase";
import { AcceptTradeProposalController } from "./AcceptTradeProposalController";
import { TradeProposalRepository } from "../../repositories/Implementations/TradeProposalsRepository";

const tradeProposalRepository = new TradeProposalRepository();
const acceptTradeProposalUseCase = new AcceptTradeProposalUseCase(
  tradeProposalRepository
);
const acceptTradeProposalController = new AcceptTradeProposalController(
  acceptTradeProposalUseCase
);

export { acceptTradeProposalController };
