import React from "react";
import { ITransaction } from "../../interfaces/Transaction";

import "./style.css";

type Props = {
  trx: ITransaction;
};

const Transaction: React.FC<Props> = ({ trx }: Props): JSX.Element => {
  return (
    <div className={`transaction transaction--${trx.type}`}>
      <div className="transaction-type">
        {trx.type === "credit" && (
          <span className="trx-status  trx-status--credit">IN</span>
        )}
        {trx.type === "debit" && (
          <span className="trx-status  trx-status--debit">OUT</span>
        )}
      </div>
      <div className="transaction-details">
        <div className="transaction-info">
          <span className="ti-user-name">{trx.accountName}</span>
          <span className="ti-amount">{trx.amount}</span>
        </div>
        <div className="transaction-other-info">
          <p>{trx.transferTo}</p>
          <p>{trx.accountNumber}</p>
          <p>{trx.email}</p>
          <p>{trx.gender}</p>
          <p>{trx.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
