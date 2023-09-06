import React, {useEffect} from 'react';
import BudgetWrite from "./BudgetWrite";
import {Budget} from "../../types/Budget";
import BudgetDetails from "./BudgetDetails";

interface Props {
  budget?: Budget

  openPopupHandle(): void

  mode: "details" | "write"
  setMode(mode: 'details' | 'write'): void
}

const BudgetPopup: React.FC<Props> = ({budget, openPopupHandle, mode, setMode}) => {

  useEffect(() => {
    if (!budget)
      setMode('write')
  }, []);

  return (
    <div className={'popup-bg'}>
      <div className={"popup"}>
        {
          (mode === 'details' && budget) && <BudgetDetails setMode={setMode} openPopupHandle={openPopupHandle} budget={budget}/>
        }
        {
          mode === 'write' && <BudgetWrite openPopupHandle={openPopupHandle} budget={budget}/>
        }
      </div>
    </div>
  );
};

export default BudgetPopup;