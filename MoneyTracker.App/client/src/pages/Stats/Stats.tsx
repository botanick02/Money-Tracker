import React, { useState } from "react";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import СhartByCategory from "../../components/СhartByCategory/СhartByCategory";
import {AccountReducer} from "../../store/Example/Reducers/AccountReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";

const Stats = () => {
  const typeOfTransactions = useAppSelector((state) => state.Account.actualTypeBalance)

  const [activeFilter, setActiveFilter] = useState(typeOfTransactions); 
  const { SET_ACTUAL_TYPE_BALANCE } = AccountReducer.actions;
  const dispatch = useAppDispatch();
  const handleFilterChange = (filter: "income" | "expense") => {
    setActiveFilter(filter);
    dispatch(SET_ACTUAL_TYPE_BALANCE(filter));
  
    
  };

  return (
    <main>
      <TimeScopePanel />
      <div className="transaction-sums">
        <div
          onClick={() => handleFilterChange("income")}
          className="transaction-sums__income"
          style={{ opacity: activeFilter === "income" ? 1 : 0.5 }}
        >
          Income
        </div>
        <div
          onClick={() => handleFilterChange("expense")}
          className="transaction-sums__expense"
          style={{ opacity: activeFilter === "expense" ? 1 : 0.5 }}
        >
          Expense
        </div>
      </div>
      <СhartByCategory />
    </main>
  );
};

export default Stats;
