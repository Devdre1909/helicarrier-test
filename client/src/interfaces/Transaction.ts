export interface Transaction {
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
  gender: string;
}

export interface TransactionDate {
  date: string;
  transactions: Array<Transaction>;
}
