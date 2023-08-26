import { ITradeProposalRepository } from "../../repositories/ITradeProposalRepository";
import { ICreateTradeProposalRequestDTO } from "./CreateTradeProposalDTO";
import { TradeProposal } from "../../entities/TradeProposal";
import { IBookRepository } from "../../repositories/IBookRepository";

export class CreateTradeProposalUseCase {
  constructor(
    private tradeProposalRepository: ITradeProposalRepository,
    private bookRepository: IBookRepository
  ) {}

  async execute(data: ICreateTradeProposalRequestDTO): Promise<TradeProposal> {
    const { offeredBook, desiredBook } = data;

    const fromUser = (await this.bookRepository.findBookById(offeredBook))
      .owner;

    const toUser = (await this.bookRepository.findBookById(desiredBook)).owner;

    const activeTradeProposal =
      await this.tradeProposalRepository.getActiveTradeProposal({
        offeredBook,
        desiredBook,
        fromUser,
        toUser,
      });
    if (activeTradeProposal) {
      throw new Error("This trade proposal is already created.");
    }

    const bookHasAlreadyBeenTraded =
      (await this.tradeProposalRepository.hasBookBeenTraded(offeredBook)) ||
      (await this.tradeProposalRepository.hasBookBeenTraded(desiredBook));

    if (bookHasAlreadyBeenTraded) {
      throw new Error("The book has already been traded.");
    }

    const newProposal = await this.tradeProposalRepository.createTradeProposal({
      offeredBook,
      desiredBook,
      fromUser,
      toUser,
    });

    return newProposal;
  }
}
