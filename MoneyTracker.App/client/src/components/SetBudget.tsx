import React, {FC, useState} from 'react';
import InputWrapper from "../elements/InputWrapper";
import {Budget} from "../types/Budget";
import Dropdown, {Option} from "../elements/Dropdown/Dropdown";

interface Props {
    budget: Budget

    openPopupHandle(): void
}

const timeScopeOptions: Option[] = [
    {
        value: "week",
        label: "Weekly"
    },
    {
        value: "date",
        label: "Day"
    },
    {
        value: "month",
        label: "Monthly"
    },
]

const SetBudget: FC<Props> = ({budget, openPopupHandle}) => {
    const [timeScope, setTimeScope] = useState<"week" | "date" | "month">(timeScopeOptions[0].value)

    const handleTimeScopeChange = (option: Option) => {
        setTimeScope(option.value)
    }


    const handleCancel = () => {
        openPopupHandle()
    }

    const handleSafe = () => {
        openPopupHandle()
    }

    return (
        <div className={'popup-bg'}>
            <div className={"popup"}>
                <div style={{background: "red"}} className={"popup__header"}>{budget.category.name}</div>

                <div className={"popup__fields"}>
                    <InputWrapper>
                        <input type="number" placeholder="Budget"/>
                    </InputWrapper>

                    {/*<div className={"popup__row"}>*/}
                    <Dropdown selectHandler={handleTimeScopeChange} options={timeScopeOptions}/>

                    <InputWrapper>
                        <input type={timeScope} placeholder="Title"/>
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