import React, { useState } from "react";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import СhartByCategory from "../../components/СhartByCategory/СhartByCategory";

const Stats = () => {
  const [activeFilter, setActiveFilter] = useState("income"); 

  const handleFilterChange = (filter: "income" | "expense") => {
    setActiveFilter(filter);
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
