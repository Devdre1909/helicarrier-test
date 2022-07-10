import React, { useState, useId, useEffect, useCallback } from "react";
import "./App.css";
// import {getUniqueDate} from './utils/helpers.js'
import { useGetTransactions } from "./services/gql/hooks/transactions";
import { TransactionDate } from "./interfaces/Transaction";
import {
  filterTransactions,
  formatTrx,
  searchTransactions,
} from "./utils/helpers";
import { searchable, filterable } from "./utils/constant";

function App() {
  const searchId = useId();
  const { transactions, loading, error } = useGetTransactions();
  const [search, setSearch] = useState("");
  const [filters, setFilter] = useState<{} | any>({});

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
        <div className="filters-wrapper">
          {filterable.map((filter) => (
            <>
              <label className="filter">
                {filter.name}
                {(filter.type === "text" || filter.type === "number") && (
                  <input
                    type={filter.type}
                    name={filter.key}
                    value={filters[filter.key]}
                    onChange={handleFilterChange}
                  />
                )}
                {filter.type === "select" && (
                  <select name={filter.key} onChange={handleFilterChange}>
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
          <button onClick={filterTrx}>Filter</button>
        </div>
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
