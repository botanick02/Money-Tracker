import React, {FC} from 'react';
import {Budget} from "../../types/Budget";
import Amount from "../../elements/Amount";
import CategoryIcon from "../../elements/CategoryIcon";
import {ReactComponent as DeleteIcon} from "../../assets/icons/Delete-icon.svg";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {deleteBudgetAction} from "../../store/Budgets/Budgets.slice";

interface Props {
  budget: Budget
  openPopupHandle(): void
  setMode(mode: 'details' | 'write'): void
}

const BudgetDetails: FC<Props> = ({openPopupHandle, budget, setMode}) => {

  const dispatch = useAppDispatch()
  const handleDelete = () => {
    dispatch(deleteBudgetAction(budget.id))
    openPopupHandle()
  }

  return (
    <>
      <div style={{background: budget.categories[0].color}}
           className={"popup__header"}>{budget.title}</div>
      <div className={"popup__fields"}>
        <div><Amount sum={budget.limit + budget.spent}/></div>
        <div className={'popup__row popup__row__half'}><span>Budget:</span><span>{budget.limit}$</span></div>
        <div className={'popup__row popup__row__half'}><span>Spent:</span><span/><span>{budget.spent}$</span></div>
        <div><a href="">View Transactions</a></div>
        <div className={'popup__row popup__row__align-start'}>
          <div className={'budgets-category-list-label'}>Categories:
            <DeleteIcon className={'delete-icon'} onClick={handleDelete}/>
          </div>
          <div className={'budgets-category-list'}>{budget.categories.map(item =>
            <div key={item.id} className={'budgets-category-list__item'}>
              <CategoryIcon category={item}/>
              {item.name}
            </div>)}
          </div>
        </div>
      </div>

      <div className={"popup__row"}>
        <button onClick={() => {
          setMode('write')
        }} className={"button"}>
          Edit
        </button>
        <button onClick={() => {
          openPopupHandle()
        }} className={"button"}>
          Exit
        </button>
      </div>
    </>
  );
};

export default BudgetDetails;