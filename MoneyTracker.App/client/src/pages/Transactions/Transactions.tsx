import React from 'react';
import TransactionList from "../../components/TransactionList/TransactionList";
import {default as test} from "../../components/TransactionList/testData.json"


const tmpFunc = (filter: "income" | "expense") => {
    const data = test.filter(item => item.category.type == filter) as Transaction[]
    return data.reduce((acc, item) => acc + item.amount, 0)
}

const Transactions = () => {
    const expense = tmpFunc("expense")
    const income = tmpFunc("income")


    return (
        <main>
            <div className={"transaction-sums"}>
                <div className={"transaction-sums__income"}>+{income} $</div>
                <div className={"transaction-sums__expense"}>{expense} $</div>
            </div>
            <TransactionList/>
            <div className={"new-transaction"}> + </div>
        </main>
    );
};

export default Transactions;