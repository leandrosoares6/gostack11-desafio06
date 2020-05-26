import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import IBalanceDTO from '../dtos/IBalanceDTO';

interface IResponse {
  transactions: Transaction[];
  balance: IBalanceDTO;
}

class ListTransactionsService {
  public async execute(): Promise<IResponse> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    const transactions = await transactionsRepository.find();

    return {
      transactions,
      balance,
    };
  }
}

export default ListTransactionsService;
