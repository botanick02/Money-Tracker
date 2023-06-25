import React, { useState } from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import TransactionCreate from "../../components/TransactionCreate/TransactionCreate";
import { default as test } from "../../components/TransactionList/testData.json";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AuthorizationReducer } from "../../store/Example/Reducers/AuthorizationReducer";
import { useNavigate } from "react-router";
import { Transaction } from "../../types/Transaction";

const tmpFunc = (filter: "income" | "expense") => {
  const data = test.filter(
    (item) => item.category.type == filter
  ) as Transaction[];
  return data.reduce((acc, item) => acc + item.amount, 0);
};

const Transactions = () => {
  const { SIGN_OUT } = AuthorizationReducer.actions;
  const navigate = useNavigate();

  const expense = tmpFunc("expense");
  const income = tmpFunc("income");
  const dispatch = useAppDispatch();

  const [defaultTransaction, setDefaultTransaction] = useState<
    "expense" | "income" | "transfer"
  >("expense");

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const handlePopupOpen = () => {
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  return (
    <>
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
      <TransactionList />
      <TransactionList />
      {!isCreatePopupOpen && (
        <div
          onClick={() => {
            handlePopupOpen();
          }}
          className={"new-transaction button"}
        >
          {" "}
          +{" "}
        </div>
      )}
      <button
        className="button "
        onClick={() => {
          dispatch(SIGN_OUT());
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </>
  );
};

export default Transactions;
