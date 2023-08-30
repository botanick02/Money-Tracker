import React, {useEffect, useState} from 'react';
import BudgetItem from "../elements/BudgetItem";
import {useAppDispatch, useAppSelector} from "../hooks/useAppDispatch";
import {fetchBudgetAction} from "../store/Budgets/Budgets.slice";
import SetBudget from "../components/SetBudget";
import {Budget} from "../types/Budget";
import TimeScopePanel from '../components/TimeScopePanel';
import {RadialChart} from "react-vis";


const Budgets = () => {
  const {budgetList} = useAppSelector(state => state.Budgets)
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | undefined>()
  const dispatch = useAppDispatch()
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const [total, setTotal] = useState(0)

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

  useEffect(()=> {
    setTotal(budgetList.reduce((acc: number, item)=> acc + item.limit, 0))
  },[budgetList])

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

      <div className='budgets__total'>
        <RadialChart
          data={budgetList.map((item) => ({
            angle: (item.limit / total) * 100,
            label: `${item.title}`,
            color: item.categories[0].color,
          }))}
          width={130}
          height={130}
          colorType="literal"
          style={{ width: '100%' }}
          onValueClick={(datapoint, event) => {
            console.log('Clicked on RadialChart:', datapoint);
          }}
        />
        <div className='budgets__total-content'>Total<br/>{total}$</div>
      </div>

      <div className={'budgets__time-scope'}>
        <div className={'active'}>Monthly</div>
        <div>Weekly</div>
        <div>Daily</div>
      </div>

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