import React, { useEffect, useState } from "react";
import TransactionItem from "../../elements/TransactionItem";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { CategoryItemReducer } from "../../store/Example/Reducers/CategoryItemsReducer";
import {FinancialOperationsSlice} from "../../store/FinancialOperations/FinancialOperations.slice";

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
  const { FETCH_TRANSACTIONS_INFO} = FinancialOperationsSlice.actions;
  const { FETCH_CATEGORIES } = CategoryItemReducer.actions;

  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(
    (state) => state.FinancialOperations
  );

  const currentAccountId = useAppSelector(state => state.Account.currentAccountId);

  useEffect(() => {
    dispatch(FETCH_TRANSACTIONS_INFO({accountId: currentAccountId === "total" ? undefined : currentAccountId}));
    dispatch(FETCH_CATEGORIES());
  }, [dateTimeTo, currentAccountId]);

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
