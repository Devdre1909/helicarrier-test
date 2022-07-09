import React, { useState, useId, useEffect, useCallback } from "react";
import "./App.css";
// import {getUniqueDate} from './utils/helpers.js'
import { useGetTransactions } from "./services/gql/hooks/transactions";
import { Transaction, TransactionDate } from "./interfaces/Transaction";
import { formatTrx, searchTransactions } from "./utils/helpers";

const filterable = [
  "amount",
  "accountName",
  "transferTo",
  "type",
  "descriptions",
  "transactionOn",
  "email",
  "accountNumber",
];

function App() {
  const searchId = useId();
  const { transactions, loading, error } = useGetTransactions();
  const [search, setSearch] = useState("");

  const [transactionByDate, setTransactionByDate] = useState<TransactionDate[]>(
    []
  );
  const [searchedTransactions, setSearchedTransactions] = useState<
    TransactionDate[]
  >([]);

  const handleFormatTrx = useCallback(() => {
    const trx = formatTrx(transactions);
    setTransactionByDate(trx);
    setSearchedTransactions(trx);
  }, [transactions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const trx = searchTransactions(
      transactionByDate,
      filterable,
      e.target.value
    );
    setSearchedTransactions(trx);
  };

  useEffect(() => {
    handleFormatTrx();
  }, [handleFormatTrx]);

  if (loading) {
    return <div>Get transactions ...</div>;
  }

  if (error) {
    return <div>Unable to get transactions</div>;
  }

  return (
    <div className="container">
      <div className="search-wrapper">
        <label className="search-label" htmlFor={searchId}>
          Search
        </label>
        <input
          className="search-input"
          type="search"
          id={searchId}
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="filters-container">
        <div className="filter">Status</div>
        <div className="filter">Type</div>
      </div>
      <div className="transaction-list">
        {searchedTransactions.map((transactionObj) => (
          <div key={transactionObj.date} className="transaction-container">
            <div className="transaction-date">
              {new Date(transactionObj.date).toLocaleDateString()}
            </div>
            <div className="transaction-group">
              {transactionObj.transactions.length === 0 ? (
                "No data match the query given"
              ) : (
                <>
                  {transactionObj.transactions.map((trx) => (
                    <div key={trx.id} className="transaction">
                      <div className="transaction-type"></div>
                      <div className="transaction-details">
                        <div className="transaction-info">
                          <span className="ti-user-name">
                            {trx.accountName}
                          </span>
                          <span className="ti-amount">{trx.amount}</span>
                        </div>
                        <div>
                          <p>{trx.transferTo}</p>
                          <p>{trx.accountNumber}</p>
                          <p>{trx.email}</p>
                          <p>{trx.gender}</p>
                          <p>{trx.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
