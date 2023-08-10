import React, { useEffect, useState } from "react";
import TimeScopePanel from "../components/TimeScopePanel/TimeScopePanel";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import {
  FETCH_TRANSACTIONS_INFO,
  SET_DATE_RANGE,
} from "../store/FinancialOperation/FinancialOperation.slice";
import TransactionCreate from "../components/Transaction/TransactionCreate";
import TransactionList from "../components/Transaction/TransactionList";
import { FETCH_CATEGORIES } from "../store/Category/Category.slice";
import { SET_CURRENT_CATEGORY } from "../store/Account/Account.slice";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const [defaultTransaction, setDefaultTransaction] = useState<
    "expense" | "income" | "transfer"
  >("expense");

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);

  const incomes = useAppSelector((state) => state.FinancialOperation.incomes);
  const expenses = useAppSelector((state) => state.FinancialOperation.expenses);
  const { currentCategoryId, currentCategoryName, currentCategoryColor } = useAppSelector(state => state.Account);


  const currentAccountId = useAppSelector(
    (state) => state.Account.currentAccountId
  );
  const dateRange = useAppSelector(
    (state) => state.FinancialOperation.dateRange
  );

  const handleCreatePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(FETCH_TRANSACTIONS_INFO());
  }, [dispatch, currentAccountId, dateRange,currentCategoryId]);

  useEffect(() => {
    dispatch(FETCH_CATEGORIES())
  }, [dispatch]);

  const onRangeChange = (startDate: string | null, endDate: string | null) => {
    if ((startDate && endDate) || (!startDate && !endDate)) {
      dispatch(SET_DATE_RANGE({ fromDate: startDate, toDate: endDate }));
    }
  };

  return (
    <main className={"transactions"}>
      {isCreatePopupOpen && (
        <TransactionCreate
          transactionDefaultType={defaultTransaction}
          closePopupHandle={handleCreatePopupOpen}
        />
      )}
      <TimeScopePanel onRangeChange={onRangeChange} />
      <div className={"transaction-sums"}>
        <div
          onClick={() => {
            handleCreatePopupOpen();
            setDefaultTransaction("income");
          }}
          className={"transaction-sums__income"}
        >
          Incomes
          <br />+ {incomes} ₴
        </div>

        {currentCategoryId !== null && (
          <div
            onClick={() => {
              dispatch({
                type: SET_CURRENT_CATEGORY,
                payload: { id: null, name: null, color: null },
              });
            }}
            className={"transaction-sums__filter"}
            style={
              currentCategoryColor !== null
                ? {
                    borderColor: currentCategoryColor,
                    color: currentCategoryColor,
                  }
                : undefined
            }
          >
             Remove {currentCategoryName} filter ❌
          </div>
        )}
        <div
          onClick={() => {
            handleCreatePopupOpen();
            setDefaultTransaction("expense");
          }}
          className={"transaction-sums__expense"}
        >
          Expenses
          <br />- {-expenses} ₴
        </div>
      </div>

      <TransactionList />

      {!isCreatePopupOpen && (
        <div
          onClick={() => {
            handleCreatePopupOpen();
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
