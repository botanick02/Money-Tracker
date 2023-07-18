import React, { useEffect, useState } from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import TransactionCreate from "../../components/TransactionCreate/TransactionCreate";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { TransactionItemsReducer } from "../../store/Example/Reducers/FinancialOperationsReducer";


const Transactions = () => {

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
  
    dispatch(FETCH_TRANSACTIONS({ dateTimeTo: dateTimeTo }));
  };
  const income = useAppSelector((state) => state.Account.actuaIncomelBalance);
  const expense = useAppSelector((state) => state.Account.actualExpenseBalance);
  
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
