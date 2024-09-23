import {useEffect, useState} from "react";
import BudgetItem from "../elements/BudgetItem";
import {useAppDispatch, useAppSelector} from "../hooks/useAppDispatch";
import {fetchBudgetAction} from "../store/Budgets/Budgets.slice";
import {Budget, TimeScope} from "../types/Budget";
import TimeScopePanel from "../components/TimeScopePanel";
import BudgetPopup from "../components/Budget/BudgetPopup";
import BudgetFilter from "../elements/BudgetFilter";

const Budgets = () => {
  const {budgetList} = useAppSelector((state) => state.Budgets);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | undefined>();
  const dispatch = useAppDispatch();
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"details" | "write">("details");

  const [pickedScopes, setPickedScopes] = useState<TimeScope[]>([])
  const [budgetListToView, setBudgetListToView] = useState<Budget[]>([])

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");

    setIsCreatePopupOpen((prevState) => {
      if (prevState) setBudgetToEdit(undefined);
      return !prevState;
    });
    setMode("details");
  };

  const handleBudgetClick = (item: Budget) => {
    setBudgetToEdit(item);
    handlePopupOpen();
  };

  const handleScopeChanges = (item: TimeScope) => {
    if (pickedScopes.includes(item)) {
      setPickedScopes(prevState => prevState.filter(x => x !== item))
    } else {
      if ([...pickedScopes, item].length === 4) {
        setPickedScopes([])
        return
      }
      setPickedScopes([...pickedScopes, item])
    }
  }

  useEffect(() => {
    dispatch(fetchBudgetAction(""));
  }, []);

  useEffect(() => {

    setBudgetListToView(budgetList.filter(x => pickedScopes.length > 0
      ? pickedScopes.includes(x.timeScope.toLowerCase() as "monthly" | "weekly" | "daily" | "yearly")
      : true))
  }, [budgetList, pickedScopes]);

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

      {/*<TimeScopePanel onRangeChange={() => {*/}
      {/*}}/>*/}

      <BudgetFilter handleScopeChange={handleScopeChanges} pickedScopes={pickedScopes}/>

      {budgetListToView.map((item) => (
        <BudgetItem
          budgetClick={handleBudgetClick}
          key={item.id}
          budget={item}
        />
      ))}

      {!isCreatePopupOpen && (
        <div
          onClick={() => {
            handlePopupOpen();
          }}
          className={"new-transaction button"}
        ></div>
      )}
    </main>
  );
};

export default Budgets;
