import React, {FC} from 'react';

import { Transaction } from '../types/Transaction';
import { ITransactionType } from '../types/ITransactionType';
import { useAppSelector } from '../hooks/useAppDispatch';



const TransactionItem: FC<{transaction: ITransactionType}> = ({transaction}) => {
    const categoryItems = useAppSelector((state) => state.Category.categories);
    const category = categoryItems.find((category) => category.id === transaction.categoryId);
    return (
        <div className={"row-item"}>
            <div className={`row-item__indicator row-item__indicator__${category?.type}`}/>
            <div className={"row-item__category-icon"}>
                <img src="https://picsum.photos/51" alt="category"/>
            </div>
            <div>
                <div className={"row-item__title"}>{transaction.title}</div>
                <div className={"row-item__sub-title"}>{category?.name}</div>
            </div>
            <div className={`row-item__amount row-item__amount__${category?.type}`}>{transaction.amount} $</div>
        </div>
    );
};

export default TransactionItem;