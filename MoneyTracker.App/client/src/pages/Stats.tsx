import React, { useEffect, useState } from "react";
import СhartByCategory from "../components/СhartByCategory/СhartByCategory";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { FETCH_STATS } from "../store/Stats/Stats.slice";

const Stats = () => {

  const [activeFilter, setActiveFilter] = useState("expense"); 
  const dispatch = useAppDispatch();
  const handleFilterChange = (filter: "income" | "expense") => {
    setActiveFilter(filter);
  };
  useEffect(() => {
    dispatch(FETCH_STATS());
  }, [dispatch]);
  return (
    <main>
   
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
