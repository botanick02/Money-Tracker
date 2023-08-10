import React from 'react';
import {Budget} from "../types/Budget";
import {Link} from "react-router-dom";
import {ReactComponent as EditIcon} from "../assets/icons/Edit-icon.svg";
import SvgFromPath from "./SvgFromPath";

interface Props {
  budget: Budget
  setBudgetToEdit(item: Budget): void
}

const CategoryBudgetItem: React.FC<Props> = ({budget, setBudgetToEdit}) => {
  const limitSpent = budget.limit + budget.spent
  const [isExtended, setIsExtended] = React.useState<boolean>(false)

  const handleRowClick = () => {
    if (budget.limit > 0)
      setIsExtended(!isExtended)
  }

  return (
    <div>
      <div className={`row-item`} onClick={() => {
        handleRowClick()
      }}>
        <div className={"row-item__category-icon"}>
          <SvgFromPath path={budget.category.iconUrl} styles={{background: budget.category.color}}/>
        </div>
        <div>
          <div className={"row-item__title"}>{budget.title?.length ? budget.title : budget.category.name}</div>
          <div className={"row-item__sub-title"}>
            Budget: {budget.limit}$ {isExtended ? "▲" : '▼'}
          </div>
        </div>
        <div
          className={`row-item__amount row-item__amount__${limitSpent > 0 ? "income" : "expense"}`}>{limitSpent} $
        </div>
      </div>
      {
        isExtended &&
        <div className={"budgets__row-extended"}>
          <div>
            <div onClick={() => {
              setBudgetToEdit(budget)
            }}><EditIcon className={"edit-icon"}/></div>
            <div>Spent: {budget.spent}$</div>
            <Link to={"/home"}>View Transactions</Link>
          </div>
        </div>
      }
    </div>

  );
};

export default CategoryBudgetItem