import React, {FC, useEffect, useState} from 'react';
import InputWrapper from "../elements/InputWrapper";
import {Budget, BudgetToCreate, BudgetToEdit} from "../types/Budget";
import Dropdown, {Option} from "../elements/Dropdown/Dropdown";
import {useAppDispatch, useAppSelector} from "../hooks/useAppDispatch";
import {createBudgetAction, deleteBudgetAction, editBudgetAction} from "../store/Budgets/Budgets.slice";
import {FETCH_CATEGORIES} from "../store/Category/Category.slice";
import {ReactComponent as DeleteIcon} from "../assets/icons/Delete-icon.svg";

interface Props {
  budget?: Budget
  openPopupHandle(): void
}

function pickBudgetForWrite(budget: Budget): BudgetToEdit {
  const {category, spent, ...budgetWrite} = budget;
  return {...budgetWrite, categoryId: category.id};
}

const emptyCreateBudget: BudgetToCreate = {limit: 0, title: "", categoryId: ""}

const SetBudget: FC<Props> = ({budget, openPopupHandle}) => {
  const [editableBudget, setBudget] = useState<BudgetToEdit | BudgetToCreate>(budget
    ? pickBudgetForWrite(budget)
    : emptyCreateBudget)

  const categoryItems = useAppSelector((state) => state.Category.categories);
  const categoryOptions: Option[] = categoryItems.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const dispatch = useAppDispatch()

  const handleDelete = () => {
    openPopupHandle()
    if (budget?.id)
      dispatch(deleteBudgetAction(budget.id))
  }

  const handleLimitInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget({...editableBudget, limit: e.target.value.length ? parseInt(e.target.value) : 0})
  }
  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget({...editableBudget, title: e.target.value})
  }

  const handleCancel = () => {
    setBudget(budget ? pickBudgetForWrite(budget) : emptyCreateBudget)
    openPopupHandle()
  }

  const handleSafe = () => {
    if (!!budget)
      dispatch(editBudgetAction(editableBudget as BudgetToEdit))
    else
      dispatch(createBudgetAction(editableBudget as BudgetToCreate))
    openPopupHandle()
  }

  const handleCategoryChange = (option: Option) => {
    setBudget({...editableBudget, categoryId: option.value});
  };

  useEffect(() => {
    dispatch(FETCH_CATEGORIES());
  }, [])

  return (
    <div className={'popup-bg'}>
      <div className={"popup"}>
        <div style={{background: budget?.category.color}} className={"popup__header"}>{budget?.category.name}</div>
        <div className={"popup__fields"}>
          {
            !!budget?.id &&
            <div onClick={handleDelete} className={"row-item__amount delete-category"}>
              <DeleteIcon/>
            </div>
          }
          Budget
          <InputWrapper>
            <input onChange={handleLimitInput} value={editableBudget.limit} type="text"
                   placeholder="Budget"/>
          </InputWrapper>

          Title
          <InputWrapper>
            <input onChange={handleTitleInput} value={editableBudget.title ?? ""} type="text"
                   placeholder="Title"/>
          </InputWrapper>

          Category
          <Dropdown
            title={"Category"}
            selectHandler={handleCategoryChange}
            options={categoryOptions}
          />
        </div>

        <div className={"popup__row"}>
          <button onClick={() => {
            handleSafe()
          }} className={"button"}>
            Save
          </button>
          <button onClick={() => {
            handleCancel()
          }} className={"button"}>
            Cancel
          </button>
        </div>
      </div>

    </div>
  );
};

export default SetBudget;