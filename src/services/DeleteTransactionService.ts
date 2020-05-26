import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findById(id);

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }
    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;