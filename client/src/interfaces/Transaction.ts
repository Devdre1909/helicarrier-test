enum Type {
  Credit = "credit",
  Debit = "debit",
}

export interface ITransaction {
  id: string;
  guid: string;
  status: boolean;
  amount: string;
  accountName: string;
  transferTo: string;
  description: string;
  transactionOn: string;
  phone: string;
  accountNumber: string;
  email: string;
  type: Type;
  gender: string;
}

export interface ITransactionDate {
  date: string;
  transactions: Array<ITransaction>;
}
