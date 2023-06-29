import React from 'react';
import {Budget} from "../types/Budget";

interface Props {
    budget: Budget
}

const CategoryBudgetItem: React.FC<Props> = ({budget}) => {
    const limitSpent = budget.limit - budget.spent

    return (
        <div className={"row-item"}>
            <div className={"row-item__category-icon"}>
                <img src={budget.category.iconUrl} alt="category"/>
            </div>
            <div>
                <div className={"row-item__title"}>{budget.category.name}</div>
                <div className={"row-item__sub-title"}>{
                    budget.limit > 0
                        ? `Limit: ${budget.limit}$`
                        : `Spent: ${budget.spent}$`
                }</div>
            </div>
            {
                budget.limit > 0
                    ? <div
                        className={`row-item__amount row-item__amount__${limitSpent > 0 ? "income" : "expense"}`}>{limitSpent} $
                    </div>
                    : <div className={`row-item__amount`}>
                        <div className={"button"}>Set Limit</div>
                    </div>
            }
        </div>
    );
};

export default CategoryBudgetItem;