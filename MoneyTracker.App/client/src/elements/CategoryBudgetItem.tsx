import React, {useState} from 'react';
import {Budget} from "../types/Budget";
import {Link} from "react-router-dom";
import {ReactComponent as EditIcon} from "../assets/icons/Edit-icon.svg";
import SetBudget from "../components/SetBudget";

interface Props {
    budget: Budget
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
}


const CategoryBudgetItem: React.FC<Props> = ({budget}) => {
    const limitSpent = budget.limit - budget.spent
    const [isExtended, setIsExtended] = React.useState<boolean>(false)

    const handleRowClick = () => {
        if (budget.limit > 0)
            setIsExtended(!isExtended)
    }

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

    const handlePopupOpen = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    return (
        <>
            {isPopupOpen && (
                <SetBudget
                    openPopupHandle={handlePopupOpen}
                    budget={budget}/>
            )}
            <div>
                <div className={`row-item`} onClick={() => {
                    handleRowClick()
                }}>
                    <div className={"row-item__category-icon"}>
                        <img src={budget.category.iconUrl} alt="category"/>
                    </div>
                    <div>
                        <div className={"row-item__title"}>{budget.category.name}</div>
                        <div className={"row-item__sub-title"}>{
                            budget.limit > 0
                                ? `Limit: ${budget.limit}$ ${isExtended ? "▲" : '▼'}`
                                : `Spent: ${budget.spent}$`
                        }</div>
                    </div>
                    {
                        budget.limit > 0
                            ? <div
                                className={`row-item__amount row-item__amount__${limitSpent > 0 ? "income" : "expense"}`}>{limitSpent} $
                            </div>
                            : <div className={`row-item__amount`}>
                                <div onClick={()=>{handlePopupOpen()}} className={"button"}>Set Limit</div>
                            </div>
                    }
                </div>
                {
                    isExtended &&
                    <div className={"budgets__row-extended"}>
                        <div>
                            <div onClick={()=>{handlePopupOpen()}}><EditIcon className={"edit-icon"}/></div>
                            <div>Spent: {budget.spent}$</div>
                            <Link to={"/home"}>View Transactions</Link>
                        </div>
                        <div>
                            {formatDate(budget.dateStart)} - {formatDate(budget.dateEnd)}
                        </div>
                    </div>
                }
            </div>
        </>

    );
};

export default CategoryBudgetItem