import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
   title: string;
   value: number;
   type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
     if (!["outcome", "income"].includes(type)) {
      throw Error('Invalid type');
     }
     
     const { total } = this.transactionsRepository.getBalance();
   
     if (type == "outcome" && total < value) {
        throw Error('Not have enough balance');
     }

     const transaction = this.transactionsRepository.create({
        title,
        value,
        type
     });

     return transaction;
  }
}

export default CreateTransactionService;
