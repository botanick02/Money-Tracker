import React, { useEffect, useState } from 'react';
import { default as test } from "./testData.json";
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
    const dateTimeTo = useAppSelector((state) => state.DateTime.dateTime);
    const { FETCH_TRANSACTIONS } = TransactionItemsReducer.actions;
    const { FETCH_CATEGORIES } = CategoryItemReducer.actions;
    const addTransactionSuccess = useAppSelector((state) => state.TransactionItems.addTransactionSuccess);
    const account = useAppSelector((state) => state.Account.actualAccount);
    const fetchTransactionsLoading = useAppSelector((state) => state.TransactionItems.loading);

    const dispatch = useAppDispatch();
    const transactions = useAppSelector((state) => state.TransactionItems.transactions);
    const [items, setItems] = useState(transactions);

    const reversedItems = items.slice().reverse();
    const filteredArray = reversedItems.filter(item => item.accountId === account);

    useEffect(() => {
        dispatch(FETCH_TRANSACTIONS({ dateTimeTo }));
        dispatch(FETCH_CATEGORIES({ dateTimeTo }));
    }, [addTransactionSuccess, account, dateTimeTo]);

    useEffect(() => {
        setItems(transactions);
    }, [account, transactions]);

    return (
        <div className={"transaction-list"}>
            {
                filteredArray.map((item, index) => {
                    if (index === 0 || getOnlyDate(filteredArray[index - 1]?.createdAt.slice(0, 10)) !== getOnlyDate(item.createdAt)) {
                        return (
                            <React.Fragment key={index}>
                                <div className={"row-title"}>{getOnlyDate(item.createdAt)}</div>
                                <TransactionItem transaction={item} />
                            </React.Fragment>
                        );
                    }
                    return <TransactionItem key={index} transaction={item} />;
                })
            }
        </div>
    );
};

export default TransactionList;
