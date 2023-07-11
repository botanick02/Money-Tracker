import React, { useEffect } from 'react';
import {default as test} from "./testData.json"
import TransactionItem from "../../elements/TransactionItem";
import { Transaction } from '../../types/Transaction';
import { TransactionItemsReducer } from '../../store/Example/Reducers/TransactionItemsReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { CategoryItemReducer } from '../../store/Example/Reducers/CategoryItemsReducer';

const getOnlyDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const TransactionList = () => {
const dateTimeTo = useAppSelector((state) => state.DateTime.dateTime)
    const { FETCH_TRANSACTIONS} = TransactionItemsReducer.actions;
    const { FETCH_CATEGORIES} = CategoryItemReducer.actions;
    const addTransactionSuccess = useAppSelector((state) => state.TransactionItems.addTransactionSuccess)
    const items = useAppSelector((state) => state.TransactionItems.transactions);
    const dispatch = useAppDispatch();
useEffect(() => {
    dispatch(FETCH_TRANSACTIONS({dateTimeTo }));
    dispatch(FETCH_CATEGORIES({dateTimeTo }));
  }, [addTransactionSuccess]);
  
  const reversedItems = items.slice().reverse();
    return (
        <div className={"transaction-list"}>
            {
                reversedItems.map((item, index)=> {
                        if (index == 0 || getOnlyDate(reversedItems[index-1]?.createdAt.slice(0,10)) != getOnlyDate(item.createdAt))
                            return <React.Fragment key={item.accountId}>
                                <div className={"row-title"}>{getOnlyDate(item.createdAt)}</div>
                                <TransactionItem transaction={item}/>
                            </React.Fragment>
                        return <TransactionItem key={item.accountId} transaction={item}/>
                    }
                )
            }
        </div>
    );
};

export default TransactionList;