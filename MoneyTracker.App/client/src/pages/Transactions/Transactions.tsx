import React, { useEffect, useState } from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import TransactionCreate from "../../components/TransactionCreate/TransactionCreate";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { TransactionItemsSlice } from "../../store/FinancialOperations/FinancialOperations.slice";


const Transactions = () => {

  const dispatch = useAppDispatch();
  const { FETCH_TRANSACTIONS } = TransactionItemsSlice.actions;
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
    dispatch(FETCH_TRANSACTIONS({}));
  };
  const incomes = useAppSelector((state) => state.TransactionItems.incomes);
  const expenses = useAppSelector((state) => state.TransactionItems.expenses);
  
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
          Incomes<br/>
          + {incomes} ₴
        </div>
        <div
          onClick={() => {
            handlePopupOpen();
            setDefaultTransaction("expense");
          }}
          className={"transaction-sums__expense"}
        >
          Expenses<br/>
          - {-expenses} ₴
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
