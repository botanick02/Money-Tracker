import React, { useState } from "react";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import CategoryesList from "../../components/CategoryesList/CategoryesList";

const Stats = () => {
  const [activeFilter, setActiveFilter] = useState("income"); // Состояние для отслеживания активного фильтра

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
      <CategoryesList />
    </main>
  );
};

export default Stats;
