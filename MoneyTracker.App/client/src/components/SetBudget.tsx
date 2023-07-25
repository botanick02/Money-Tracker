import React, {FC, useState} from 'react';
import InputWrapper from "../elements/InputWrapper";
import {Budget, BudgetWrite} from "../types/Budget";
import Dropdown, {Option} from "../elements/Dropdown/Dropdown";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {editBudgetAction} from "../store/Budgets/Budgets.slice";

interface Props {
    budget: Budget

    openPopupHandle(): void
}

const timeScopeOptions: Option[] = [
    {
        value: "date",
        label: "Day"
    },
    {
        value: "week",
        label: "Weekly"
    },
    {
        value: "month",
        label: "Monthly"
    },
]

function pickBudgetForWrite(budget: Budget): BudgetWrite {
    const {category, spent, ...budgetWrite} = budget;
    return {...budgetWrite, categoryId: category.id};
}

const SetBudget: FC<Props> = ({budget, openPopupHandle}) => {
    const [timeScope, setTimeScope] = useState<"week" | "date" | "month">(timeScopeOptions[0].value)
    const [editableBudget, setBudget] = useState<BudgetWrite>(pickBudgetForWrite(budget))

    const dispatch = useAppDispatch()

    // console.warn(editableBudget)

    const handleTimeScopeChange = (option: Option) => {
        setTimeScope(option.value)
    }

    const handleLimitInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget({...editableBudget, limit: e.target.value.length ? parseInt(e.target.value) : 0})
    }

    const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget({...editableBudget, startDate: (e.target.value.concat("T00:00:00.000Z"))})
    }

    const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget({...editableBudget, endDate: (e.target.value.concat("T00:00:00.000Z"))})
    }


    const handleCancel = () => {
        setBudget(pickBudgetForWrite(budget))
        openPopupHandle()
    }

    const handleSafe = () => {
        dispatch(editBudgetAction(editableBudget))
        openPopupHandle()
    }

    return (
        <div className={'popup-bg'}>
            <div className={"popup"}>
                <div style={{background: "red"}} className={"popup__header"}>{budget.category.name}</div>

                <div className={"popup__fields"}>
                    <InputWrapper>
                        {
                            editableBudget.limit
                                ? <input onChange={handleLimitInput} value={editableBudget.limit} type="number"
                                         placeholder="Budget"/>
                                : <input onChange={handleLimitInput} type="number" placeholder="Budget"/>
                        }
                    </InputWrapper>

                    {/*<div className={"popup__row"}>*/}
                    <Dropdown selectHandler={handleTimeScopeChange} options={timeScopeOptions}/>
                    Start
                    <InputWrapper>
                        <input onChange={handleStartDate} type={timeScope} placeholder="Title"/>
                    </InputWrapper>
                    End
                    <InputWrapper>
                        <input onChange={handleEndDate} type={timeScope} placeholder="Title"/>
                    </InputWrapper>

                    {/*</div>*/}

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