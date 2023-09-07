import React, {useEffect, useState} from 'react';
import BudgetItem from "../elements/BudgetItem";
import {useAppDispatch, useAppSelector} from "../hooks/useAppDispatch";
import {fetchBudgetAction} from "../store/Budgets/Budgets.slice";
import {Budget} from "../types/Budget";
import TimeScopePanel from '../components/TimeScopePanel';
import BudgetPopup from "../components/Budget/BudgetPopup";


const Budgets = () => {
  const {budgetList} = useAppSelector(state => state.Budgets)
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | undefined>()
  const dispatch = useAppDispatch()
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'details' | 'write'>('details')

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");

    setIsCreatePopupOpen((prevState) => {
      if (prevState)
        setBudgetToEdit(undefined)
      return !prevState
    });
    setMode("details")
  };

  const handleBudgetClick = (item: Budget) => {
    setBudgetToEdit(item)
    handlePopupOpen()
  }

  useEffect(() => {
    dispatch(fetchBudgetAction(""))
  }, [])

  return (
    <main className={"budgets"}>
      {isCreatePopupOpen && (
        <BudgetPopup
          budget={budgetToEdit}
          openPopupHandle={handlePopupOpen}
          mode={mode}
          setMode={setMode}
        />
      )}

      <TimeScopePanel onRangeChange={() => {}}/>


      {
        budgetList.map(item => <BudgetItem budgetClick={handleBudgetClick} key={item.id} budget={item}/>)
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