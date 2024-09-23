import React from 'react';
import {TimeScope} from "../types/Budget";

const timeScopes: TimeScope[] = ['yearly', 'monthly', 'weekly', 'daily']

interface Props {
  handleScopeChange(changed: TimeScope): void
  pickedScopes: TimeScope[]
}

const BudgetFilter: React.FC<Props> = ({handleScopeChange, pickedScopes}) => {
  return (
    <div className={'scope-change budgets__filter'}>
      {
        timeScopes.map(item => <button
          key={item}
          onClick={() => {handleScopeChange(item)}}
          className={pickedScopes.length === 0 || pickedScopes.includes(item) ? "active-scope" : ''}>{item}</button>)
      }
    </div>
  );
};

export default BudgetFilter;