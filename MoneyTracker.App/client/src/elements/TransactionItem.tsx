import React, {FC} from 'react';

import { Transaction } from '../types/Transaction';



const TransactionItem: FC<{transaction: Transaction}> = ({transaction}) => {

    return (
        <div className={"row-item"}>
            <div className={`row-item__indicator row-item__indicator__${transaction.category.type}`}/>
            <div className={"row-item__category-icon"}>
                <img src={transaction.category.iconUrl} alt="category"/>
            </div>
            <div>
                <div className={"row-item__title"}>{transaction.title}</div>
                <div className={"row-item__sub-title"}>{transaction.category.name}</div>
            </div>
            <div className={`row-item__amount transaction__amount__${transaction.category.type}`}>{transaction.amount} $</div>
        </div>
    );
};

export default TransactionItem;