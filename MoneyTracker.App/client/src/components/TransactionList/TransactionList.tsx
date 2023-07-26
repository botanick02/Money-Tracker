import React, { useEffect } from "react";
import TransactionItem from "../../elements/TransactionItem";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { FETCH_TRANSACTIONS_INFO } from "../../store/FinancialOperation/FinancialOperation.slice";
import { FETCH_CATEGORIES } from "../../store/Category/Category.slice";

const getOnlyDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


const TransactionList = () => {
  const transactions = useAppSelector(
    (state) => state.FinancialOperation.transactions
  );

  return (
    <div className={"transaction-list"}>
      {transactions.length > 0 ? transactions.map((item, index) => {
        if (
          index === 0 ||
          getOnlyDate(transactions[index - 1]?.createdAt) !==
            getOnlyDate(item.createdAt)
        ) {
          return (
            <React.Fragment key={index}>
              <div className={"row-title"}>{getOnlyDate(item.createdAt)}</div>
              <TransactionItem transaction={item} />
            </React.Fragment>
          );
        }
        return <TransactionItem key={index} transaction={item} />;
      }) : <div  className={"transaction-list__message-empty"}>No transactions to show</div>}
    </div>
  );
};

export default TransactionList;
