import { Repository, EntityRepository } from 'typeorm';

import IBalanceDTO from '../dtos/IBalanceDTO';
import Transaction from '../models/Transaction';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<IBalanceDTO> {
    const transactions = await this.find();

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulator, transaction) => {
        return accumulator + transaction.value;
      }, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((accumulator, transaction) => {
        return accumulator + transaction.value;
      }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}

export default TransactionsRepository;
