import React, { useState } from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import TransactionCreate from "../../components/TransactionCreate/TransactionCreate";
import { default as test } from "../../components/TransactionList/testData.json";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { Transaction } from "../../types/Transaction";
import CategoryesList from "../../components/CategoryesList/CategoryesList";

const tmpFunc = (filter: "income" | "expense") => {
  const data = test.filter(
    (item) => item.category.type == filter
  ) as Transaction[];
  return data.reduce((acc, item) => acc + item.amount, 0);
};

const Stats = () => {

  


  return (
    <main>
  
      <TimeScopePanel />
      <CategoryesList />
    
    </main>
  );
};

export default Stats;
