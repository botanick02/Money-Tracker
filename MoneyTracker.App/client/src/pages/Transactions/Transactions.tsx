import React, { useState } from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import TransactionCreate from "../../components/TransactionCreate/TransactionCreate";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { FETCH_TRANSACTIONS_INFO } from "../../store/FinancialOperation/FinancialOperation.slice";


const Transactions = () => {
  const dispatch = useAppDispatch();
  const [defaultTransaction, setDefaultTransaction] = useState<
    "expense" | "income" | "transfer"
  >("expense");
 
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  
  const incomes = useAppSelector((state) => state.FinancialOperation.incomes);
  const expenses = useAppSelector((state) => state.FinancialOperation.expenses);
  const currentAccountId = useAppSelector(state => state.Account.currentAccountId)

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  const handleAddTransaction = () => {
    dispatch(FETCH_TRANSACTIONS_INFO({accountId: currentAccountId === "total" ? null : currentAccountId }));
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
