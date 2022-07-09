import { gql, useQuery } from "@apollo/client";
import { Transaction } from "../../../interfaces/Transaction";

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    allTransactions {
      status
      amount
      accountName
      transferTo
      type
      descriptions
      transactionOn
      email
      gender
      phone
      accountNumber
    }
  }
`;

export const useGetTransactions = (): {
  transactions: Transaction[];
  loading: boolean;
  error: object | undefined;
} => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  return { transactions: data?.allTransactions, loading, error };
};
