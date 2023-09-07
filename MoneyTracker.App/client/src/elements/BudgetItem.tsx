import React from 'react';
import {Budget} from "../types/Budget";
import SvgFromPath from "./SvgFromPath";
import Amount from "./Amount";

interface Props {
  budget: Budget

  budgetClick(item: Budget): void
}

const BudgetItem: React.FC<Props> = ({budget, budgetClick}) => {
  const limitSpent = budget.limit + budget.spent

  return (
    <>
      <div className={`row-item`} onClick={() => {
        budgetClick(budget)
      }}>
        <div className={"row-item__category-icon"}>
          {
            !!budget.categories &&
            <SvgFromPath path={budget.categories[0].iconUrl} styles={{background: budget.categories[0].color}}/>
          }
        </div>
        <div>
          <div className={"row-item__title"}>{budget.title?.length ? budget.title : budget.categories[0].name}</div>
          <div className={"row-item__sub-title"}>
            Budget: {budget.limit}$
          </div>
        </div>
        <div
          className={'row-item__amount'}><Amount sum={limitSpent}/>
        </div>
      </div>
    </>

  );
};

export default BudgetItem