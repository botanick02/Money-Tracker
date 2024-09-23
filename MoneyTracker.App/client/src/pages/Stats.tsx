import { useEffect, useState } from "react";
import СhartByCategory from "../components/СhartByCategory";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { CHANGE_STATS_FILTER, FETCH_STATS } from "../store/Stats/Stats.slice";
import { SET_CURRENT_CATEGORY } from "../store/Account/Account.slice";
import TimeScopePanel from "../components/TimeScopePanel";
import { SET_DATE_RANGE, TransactionTypes } from "../store/FinancialOperation/FinancialOperation.slice";

const Stats = () => {

  const [activeFilter, setActiveFilter] = useState(useAppSelector((state) => state.Stats.filter)); 
  const incomes = useAppSelector((state) => state.FinancialOperation.incomes);
  const expenses = useAppSelector((state) => state.FinancialOperation.expenses);
  const fromDate = useAppSelector((state) => state.FinancialOperation.dateRange.fromDate);
  const toDate = useAppSelector((state) =>  state.FinancialOperation.dateRange.toDate);
  useAppSelector((state) => state.Account);
  const dispatch = useAppDispatch();
  const handleFilterChange = (filter: TransactionTypes.Income | TransactionTypes.Expense) => {
    setActiveFilter(filter);
    dispatch(CHANGE_STATS_FILTER(filter));
    dispatch({
      type: SET_CURRENT_CATEGORY,
      payload: { id: null, name: null, color: null },
    });
  };
  console.log(activeFilter)
  useEffect(() => {
    dispatch(FETCH_STATS());
  }, [dispatch,fromDate,toDate]);
  const onRangeChange = (startDate: string | null, endDate: string | null) => {
    if ((startDate && endDate) || (!startDate && !endDate)) {
      dispatch(SET_DATE_RANGE({ fromDate: startDate, toDate: endDate }));
    }
  };
  return (
    <main>
      <TimeScopePanel onRangeChange={onRangeChange} />
      <div className="transaction-sums">
        <div
          onClick={() => handleFilterChange(TransactionTypes.Income)}
          className="transaction-sums__income"
          style={{ opacity: activeFilter === TransactionTypes.Income ? 1 : 0.5 }}
        >
          Income
          <br />+ {incomes} ₴
        </div>

        <div
          onClick={() => handleFilterChange(TransactionTypes.Expense)}
          className="transaction-sums__expense"
          style={{ opacity: activeFilter === TransactionTypes.Expense ? 1 : 0.5 }}
        >
          Expense
          <br />- {-expenses} ₴
        </div>
      </div>
      <СhartByCategory />
    </main>
  );
};

export default Stats;
