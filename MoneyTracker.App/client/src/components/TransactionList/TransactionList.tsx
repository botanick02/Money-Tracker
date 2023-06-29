import React from 'react';
import {default as test} from "./testData.json"
import TransactionItem from "../../elements/TransactionItem";
import { Transaction } from '../../types/Transaction';

const getOnlyDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const TransactionList = () => {
    const transactions = test as Transaction[]

    return (
        <div className={"transaction-list"}>
            {
                transactions.map((item, index)=> {
                        if (index == 0 || getOnlyDate(transactions[index-1].dateTime) != getOnlyDate(item.dateTime))
                            return <React.Fragment key={item.id}>
                                <div className={"row-title"}>{getOnlyDate(item.dateTime)}</div>
                                <TransactionItem transaction={item}/>
                            </React.Fragment>
                        return <TransactionItem key={item.id} transaction={item}/>
                    }
                )
            }
        </div>
    );
};

export default TransactionList;