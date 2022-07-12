import { ITransaction, ITransactionDate } from "../interfaces/Transaction";

export function formatTrx(transactions: ITransaction[]): ITransactionDate[] {
  if (transactions && transactions.length > 0) {
    const groupBy: ITransactionDate[] = [];

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
  transactions: ITransactionDate[],
  searchIn: string[],
  searchKeyword?: string
): ITransactionDate[] {
  if (searchIn.length === 0 || !searchKeyword) return transactions;

  const trxCopy: ITransactionDate[] = JSON.parse(JSON.stringify(transactions));

  trxCopy.forEach((trx) => {
    trx.transactions = trx.transactions.filter((tx: ITransaction) => {
      return searchIn.some((key) => {
        return tx[key as keyof ITransaction]
          .toString()
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
      });
    });
  });

  return trxCopy;
}

export function filterTransactions(
  transactions: ITransactionDate[],
  filters: any
): ITransactionDate[] {
  if (!filters) return transactions;

  const trxCopy: ITransactionDate[] = JSON.parse(JSON.stringify(transactions));

  trxCopy.forEach((trx) => {
    trx.transactions = trx.transactions.filter((tx: ITransaction) => {
      return Object.keys(filters).some((key) => {
        return (
          tx[key as keyof ITransaction].toString().toLowerCase() ===
          filters[key].toLowerCase()
        );
      });
    });
  });

  return trxCopy;
}
