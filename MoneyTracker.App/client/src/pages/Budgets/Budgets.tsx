import React, {useState} from 'react';
import {default as test} from "./testData.json"
import {Budget} from "../../types/Budget";
import CategoryBudgetItem from "../../elements/CategoryBudgetItem";
import TimeScopePanel from "../../components/TimeScopePanel/TimeScopePanel";
import SetBudget from "../../components/SetBudget";


const Budgets = () => {
    const data = test as Budget[]
    const budgeted = data.filter(item => item.limit > 0)
    const nonBudgeted = data.filter(item => item.limit === 0)

    return (
        <main className={"budgets"}>
            <TimeScopePanel />
            <div className={"row-title"}>Budgeted Categories</div>
            {
                budgeted.map(item => <CategoryBudgetItem key={item.id} budget={item}/>)
            }
            <div className={"row-title"}>Not Budgeted Categories</div>
            {
                nonBudgeted.map(item => <CategoryBudgetItem key={item.id} budget={item}/>)
            }
        </main>
    );
};

export default Budgets;