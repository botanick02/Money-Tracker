import React, { useEffect, useState } from "react";
import TransactionItem from "../../elements/TransactionItem";
import { TransactionItemsReducer } from "../../store/Example/Reducers/FinancialOperationsReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { CategoryItemReducer } from "../../store/Example/Reducers/CategoryItemsReducer";

const getOnlyDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const TransactionList = () => {
  const dateTimeTo = useAppSelector((state) => state.DateTime.dateTime);
  const { FETCH_TRANSACTIONS } = TransactionItemsReducer.actions;
  const { FETCH_CATEGORIES } = CategoryItemReducer.actions;

  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state) => state.TransactionItems.transactions
  );

  useEffect(() => {
    dispatch(FETCH_TRANSACTIONS({ dateTimeTo }));
    dispatch(FETCH_CATEGORIES());
  }, [dateTimeTo]);

  return (
    <div className={"transaction-list"}>
      {transactions.map((item, index) => {
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
      })}
    </div>
  );
};

export default TransactionList;
