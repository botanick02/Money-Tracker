import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import {
  FETCH_TRANSACTIONS_INFO,
  SET_DATE_RANGE,
  SET_TRANSACTION_TYPE,
  TransactionTypes,
} from "../store/FinancialOperation/FinancialOperation.slice";
import TransactionCreate from "../components/Transaction/TransactionCreate";
import TimeScopePanel from "../components/TimeScopePanel";
import { FETCH_CATEGORIES } from "../store/Category/Category.slice";
import TransactionList from "../components/Transaction/TransactionList";

const Transactions = () => {
  const dispatch = useAppDispatch();

  const timeTravelValue = useAppSelector((state) => state.TimeTravel.datetime);
  const incomes = useAppSelector((state) => state.FinancialOperation.incomes);
  const expenses = useAppSelector((state) => state.FinancialOperation.expenses);
  const transactionType = useAppSelector(
    (state) => state.FinancialOperation.transactionType
  );
  const currentAccountId = useAppSelector(
    (state) => state.Account.currentAccountId
  );
  const dateRange = useAppSelector(
    (state) => state.FinancialOperation.dateRange
  );

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const [dateRangeIsSet, setDateRangeIsSet] = useState(false);

  const handleCreatePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  const onRangeChange = (startDate: string | null, endDate: string | null) => {
    if ((startDate && endDate) || (!startDate && !endDate)) {
      setDateRangeIsSet(true);
      dispatch(SET_DATE_RANGE({ fromDate: startDate, toDate: endDate }));
    }
  };

  const changeTransactionTypeFilter = (type: TransactionTypes.Expense | TransactionTypes.Income) => {
    if (transactionType !== type) {
      dispatch(SET_TRANSACTION_TYPE(type));
    } else {
      dispatch(SET_TRANSACTION_TYPE(null));
    }
  };

  useEffect(() => {
    console.log(dateRangeIsSet);
    if (dateRangeIsSet) {
      dispatch(FETCH_TRANSACTIONS_INFO());
      console.log("Update");
    }
  }, [
    dispatch,
    currentAccountId,
    dateRange,
    timeTravelValue,
    transactionType,
    dateRangeIsSet,
  ]);

  useEffect(() => {
    dispatch(FETCH_CATEGORIES());
  }, [dispatch]);

  return (
    <main className={"transactions"}>
      {isCreatePopupOpen && (
        <TransactionCreate closePopupHandle={handleCreatePopupOpen} />
      )}
      <TimeScopePanel onRangeChange={onRangeChange} />

      <div className={"transaction-sums"}>
        <div
          onClick={() => {
            changeTransactionTypeFilter(TransactionTypes.Income);
          }}
          className={`transaction-sums__income ${
            transactionType === TransactionTypes.Income && "active"
          }`}
        >
          Incomes
          <br />+ {incomes} ₴
        </div>
        <div
          onClick={() => {
            changeTransactionTypeFilter(TransactionTypes.Expense);
          }}
          className={`transaction-sums__expense ${
            transactionType === TransactionTypes.Expense && "active"
          }`}
        >
          Expenses
          <br />- {-expenses} ₴
        </div>
      </div>

      <TransactionList />

      {!isCreatePopupOpen && !timeTravelValue && (
        <div
          onClick={() => {
            handleCreatePopupOpen();
          }}
          className={"new-transaction button"}
        ></div>
      )}
    </main>
  );
};

export default Transactions;
