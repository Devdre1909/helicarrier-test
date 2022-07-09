import { Transaction, TransactionDate } from "../interfaces/Transaction";

export function formatTrx(transactions: Transaction[]): TransactionDate[] {
  if (transactions && transactions.length > 0) {
    const groupBy: TransactionDate[] = [];

    transactions.forEach((transaction) => {
      const date = transaction.transactionOn.split("T")[0];

      const findDate = groupBy.findIndex((v) => v.date === date);

      if (findDate < 0) {
        groupBy.push({
          date,
          transactions: [transaction],
        });
      } else {
        groupBy[findDate].transactions.push(transaction);
      }
    });

    groupBy.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));

    return groupBy;
  }
  return [];
}

export function searchTransactions(
  transactions: TransactionDate[],
  searchIn: string[],
  searchKeyword?: string
): TransactionDate[] {
  if (searchIn.length === 0 || !searchKeyword) return transactions;

  const trxCopy: TransactionDate[] = JSON.parse(JSON.stringify(transactions));

  trxCopy.forEach((trx) => {
    trx.transactions = trx.transactions.filter((tx) => {
      return searchIn.some((key) => {
        return tx[key as keyof Transaction]
          .toString()
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
      });
    });
  });

  return trxCopy;
}


export function filterTransactions(
  transactions: TransactionDate[],
  filters: any,
): TransactionDate[] {
  if (!filters) return transactions;

  const trxCopy: TransactionDate[] = JSON.parse(JSON.stringify(transactions));

  trxCopy.forEach((trx) => {
    trx.transactions = trx.transactions.filter((tx) => {
      return Object.keys(filters).every((key) => {
        return tx[key as keyof Transaction]
          .toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      });
    });
  });

  return trxCopy;
}