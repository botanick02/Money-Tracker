import React, {useEffect, useState} from 'react';
import BudgetItem from "../elements/BudgetItem";
import {useAppDispatch, useAppSelector} from "../hooks/useAppDispatch";
import {fetchBudgetAction} from "../store/Budgets/Budgets.slice";
import SetBudget from "../components/SetBudget";
import {Budget} from "../types/Budget";
import TimeScopePanel from '../components/TimeScopePanel';


const Budgets = () => {
  const {budgetList} = useAppSelector(state => state.Budgets)
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | undefined>()
  const dispatch = useAppDispatch()
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");

    setIsCreatePopupOpen((prevState) => {
      if (prevState)
        setBudgetToEdit(undefined)
      return !prevState
    });
  };

  const handleSetBudgetToEdit = (item: Budget) => {
    setBudgetToEdit(item)
    handlePopupOpen()
  }

  useEffect(() => {
    dispatch(fetchBudgetAction(""))
  }, [])

  return (
    <main className={"budgets"}>
      {isCreatePopupOpen && (
        <SetBudget
          budget={budgetToEdit}
          openPopupHandle={handlePopupOpen}
        />
      )}
      <TimeScopePanel onRangeChange={() => {
      }}/>
      <div className={"row-title"}>Budgeted Categories</div>
      {
        budgetList.map(item => <BudgetItem setBudgetToEdit={handleSetBudgetToEdit} key={item.id} budget={item}/>)
      }
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
    </main>
  );
};

export default Budgets;