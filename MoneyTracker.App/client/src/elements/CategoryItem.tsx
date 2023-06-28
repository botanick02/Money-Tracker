import React, {FC} from 'react';

import { Transaction } from '../types/Transaction';



const CategoryItem: FC<{transaction: Transaction,percentage:number}> = ({transaction,percentage}) => {

    return (
        <div className={"category"}>
            <div className={`category__indicator category__indicator__${transaction.category.type}`}/>
            <div className={"category__category-icon"}>
                <img src={transaction.category.iconUrl} alt="category"/>
            </div>
            <div>
                <div className={"category__title"}>{transaction.category.name}|{transaction.category.percentage}</div>
                
            </div>
            <div className={`category__amount `}>{transaction.amount} $ {percentage} </div>
        </div>
    );
};

export default CategoryItem;