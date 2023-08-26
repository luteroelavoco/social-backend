import { TradeProposalRepository } from "../../repositories/Implementations/TradeProposalsRepository";
import { CreateTradeProposalController } from "./CreateTradeProposalController";
import { CreateTradeProposalUseCase } from "./CreateTradeProposalUseCase";
import { BookRepository } from "../../repositories/Implementations/BookRepository";

const bookRepository = new BookRepository();
const tradeProposalRepository = new TradeProposalRepository();

const tradeProposalUseCase = new CreateTradeProposalUseCase(
  tradeProposalRepository,
  bookRepository
);

const createTradeProposalController = new CreateTradeProposalController(
  tradeProposalUseCase
);

export { createTradeProposalController };
