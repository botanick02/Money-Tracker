import React, { useEffect, useState } from 'react';
import { default as test } from "./testData.json";
import TransactionItem from "../../elements/TransactionItem";
import { Transaction } from '../../types/Transaction';
import { TransactionItemsReducer } from '../../store/Example/Reducers/TransactionItemsReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { CategoryItemReducer } from '../../store/Example/Reducers/CategoryItemsReducer';
import {AccountReducer} from '../../store/Example/Reducers/AccountReducer';

const getOnlyDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const TransactionList = () => {
    const dateTimeTo = useAppSelector((state) => state.DateTime.dateTime);
    const { FETCH_TRANSACTIONS } = TransactionItemsReducer.actions;
    const { FETCH_CATEGORIES } = CategoryItemReducer.actions;
    const { SET_ACTUAL_BALANCE,SET_ACTUAL_INCOME_BALANCE,SET_ACTUAL_EXPENSE_BALANCE } = AccountReducer.actions;
    const addTransactionSuccess = useAppSelector((state) => state.TransactionItems.cancelLoading);
 

    const dispatch = useAppDispatch();
    const transactions = useAppSelector((state) => state.TransactionItems.transactions);
    const cancelTransaction = useAppSelector((state) => state.TransactionItems.cancelTransactionSuccess);

    const [items, setItems] = useState(transactions);

    
    const account = useAppSelector((state) => state.Account.actualAccount);
    let   filteredArray = items.filter(item => item.accountId === account);
    if (account==="645645646"){

        filteredArray=  items.filter(item => {
            return (
              item.accountId === "69ae7bca-b2ed-47f1-a084-6bb08ed49a6e" ||
              item.accountId === "bc62fbf1-0f5c-4cc0-b995-7573ad855e8d" ||
              item.accountId === "4856a9ed-4045-4848-a9b4-b3b36404c69f"
            );
          });
    }
   
    const sum = filteredArray.reduce((total, item) => total + item.amount, 0);

    const positiveSum = filteredArray.reduce((total, item) => {
        if (item.amount > 0) {
          return total + item.amount;
        }
        return total;
      }, 0);
      
      const negativeSum = filteredArray.reduce((total, item) => {
        if (item.amount < 0) {
          return total + item.amount;
        }
        return total;
      }, 0);
    useEffect(() => {
        dispatch(FETCH_TRANSACTIONS({ dateTimeTo }));
        dispatch(SET_ACTUAL_BALANCE(sum));
        dispatch( SET_ACTUAL_INCOME_BALANCE( positiveSum));
        dispatch( SET_ACTUAL_EXPENSE_BALANCE(negativeSum));
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
