import React, { useState, useId, useEffect, useCallback } from "react";
import { useGetTransactions } from "./services/gql/hooks/transactions";
import { ITransactionDate } from "./interfaces/Transaction";
import {
  filterTransactions,
  formatTrx,
  searchTransactions,
} from "./utils/helpers";
import { searchable, filterable } from "./utils/constant";
import Status from "./components/Status";

import "./App.css";
import Transaction from "./components/Transaction";

const filterableObject: any = {};

filterable.forEach((filter) => {
  filterableObject[filter.key] = "";
});

function App() {
  const searchId = useId();
  const { transactions, loading, error } = useGetTransactions();
  const [search, setSearch] = useState("");
  const [filters, setFilter] = useState<{} | any>(filterableObject);

  const [transactionByDate, setTransactionByDate] = useState<
    ITransactionDate[]
  >([]);
  const [searchedTransactions, setSearchedTransactions] = useState<
    ITransactionDate[]
  >([]);

  const handleFormatTrx = useCallback(() => {
    const trx = formatTrx(transactions);
    setTransactionByDate(trx);
    setSearchedTransactions(trx);
  }, [transactions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilter({});
    const trx = searchTransactions(
      transactionByDate,
      searchable,
      e.target.value
    );
    setSearchedTransactions(trx);
  };

  const filterTrx = () => {
    setSearch("");
    const trx = filterTransactions(transactionByDate, filters);
    setSearchedTransactions(trx);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetTrx = () => {
    setSearch("");
    setFilter(filterableObject);
    setSearchedTransactions(transactionByDate);
  };

  useEffect(() => {
    handleFormatTrx();
  }, [handleFormatTrx]);

  if (loading) {
    return (
      <Status>
        <h3>Loading transactions...</h3>
      </Status>
    );
  }

  if (error) {
    return (
      <Status>
        <div>
          <h2>Unable to get transactions</h2>
          <div>
            <small>Please check you server</small>
          </div>
        </div>
      </Status>
    );
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
        <div className="filters-wrapper">
          {filterable.map((filter) => (
            <>
              <label className="filter">
                <span>{filter.name}</span>
                {(filter.type === "text" || filter.type === "number") && (
                  <input
                    type={filter.type}
                    name={filter.key}
                    value={filters[filter.key]}
                    onChange={handleFilterChange}
                  />
                )}
                {filter.type === "select" && (
                  <select
                    name={filter.key}
                    value={filters[filter.key]}
                    onChange={handleFilterChange}
                  >
                    <option value="--" defaultChecked>
                      ---
                    </option>
                    {filter.options?.map((value) => (
                      <option value={value.value}>{value.title}</option>
                    ))}
                  </select>
                )}
              </label>
            </>
          ))}
        </div>
        <div className="filter-action">
          <button onClick={resetTrx}>Reset</button>
          <button onClick={filterTrx}>Filter</button>
        </div>
      </div>
      <div className="transaction-list">
        {searchedTransactions.map((transactionObj) => (
          <div key={transactionObj.date} className="transaction-container">
            <div className="transaction-date-wrapper">
              <span className="transaction-date-date">
                {" "}
                {new Date(transactionObj.date).toDateString()}
              </span>
              <span className="transaction-date-count">
                {transactionObj.transactions.length}
              </span>
            </div>
            <div className="transaction-group">
              {transactionObj.transactions.length === 0 ? (
                "No data match the query given"
              ) : (
                <>
                  {transactionObj.transactions.map((trx) => (
                    <Transaction key={trx.id} trx={trx} />
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
