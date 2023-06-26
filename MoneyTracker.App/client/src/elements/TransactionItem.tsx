import React, {FC} from 'react';
import { Transaction } from '../types/Transaction';



const TransactionItem: FC<{transaction: Transaction}> = ({transaction}) => {

    return (
        <div className={"transaction"}>
            <div className={`transaction__indicator transaction__indicator__${transaction.category.type}`}/>
            <div className={"transaction__category-icon"}>
                <img src={transaction.category.iconUrl} alt="category"/>
            </div>
            <div>
                <div className={"transaction__title"}>{transaction.title}</div>
                <div className={"transaction__category-name"}>{transaction.category.name}</div>
            </div>
            <div className={`transaction__amount transaction__amount__${transaction.category.type}`}>{transaction.amount} $</div>
        </div>
    );
};

export default TransactionItem;