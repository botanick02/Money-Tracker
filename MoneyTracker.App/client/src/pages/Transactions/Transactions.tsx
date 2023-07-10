import React, { useEffect, useState } from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import TransactionCreate from "../../components/TransactionCreate/TransactionCreate";
import { default as test } from "../../components/TransactionList/testData.json";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { TransactionItemsReducer } from "../../store/Example/Reducers/TransactionItemsReducer";

import { Transaction } from "../../types/Transaction";



const tmpFunc = (filter: "income" | "expense") => {
  const data = test.filter((item) => item.category.type === filter) as Transaction[];
  return data.reduce((acc, item) => acc + item.amount, 0);
};

const Transactions = () => {

  const expense = tmpFunc("expense");
  const income = tmpFunc("income");
  const dispatch = useAppDispatch();
  const { FETCH_TRANSACTIONS } = TransactionItemsReducer.actions;
  const dateTimeTo = useAppSelector((state) => state.DateTime.dateTime)
  const [defaultTransaction, setDefaultTransaction] = useState<
    "expense" | "income" | "transfer"
  >("expense");
 
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  const handleAddTransaction = () => {
    console.log("Adding transaction...");
    dispatch(FETCH_TRANSACTIONS({ dateTimeTo: dateTimeTo }));
  };

  return (
    <main className={'transactions'}>
      {isCreatePopupOpen && (
        <TransactionCreate
          transactionDefaultType={defaultTransaction}
          openPopupHandle={handlePopupOpen}
        />
      )}
      <TimeScopePanel />
      <div className={"transaction-sums"}>
        <div
          onClick={() => {
            handlePopupOpen();
            setDefaultTransaction("income");
          }}
          className={"transaction-sums__income"}
        >
          +{income} $
        </div>
        <div
          onClick={() => {
            handlePopupOpen();
            setDefaultTransaction("expense");
          }}
          className={"transaction-sums__expense"}
        >
          {expense} $
        </div>
      </div>

      <TransactionList />

      {!isCreatePopupOpen && (
        <div
          onClick={() => {
            handlePopupOpen();
            handleAddTransaction();
          }}
          className={"new-transaction button"}
        >
          {" "}
          +{" "}
        </div>
      )}
    </main>
  );
};

export default Transactions;
