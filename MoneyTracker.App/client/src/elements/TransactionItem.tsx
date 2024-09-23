import React from 'react';
import { Transaction } from '../types/Transaction';
import { useAppSelector } from '../hooks/useAppDispatch';
import Amount from './Amount';
import { TransactionTypes } from '../store/FinancialOperation/FinancialOperation.slice';

interface TransactionItemProps {
  transaction: Transaction;
  onMoreInfoCLick: (id: string) => void;
}

const TransactionItem = ({transaction, onMoreInfoCLick}: TransactionItemProps) => {
  const {categories} = useAppSelector((state) => state.Category);
  const category = categories.find((category) => category === transaction.category);
  const type = transaction.amount > 0 ? "income" : "expense";

  return (
    <div className={"row-item"} onClick={() => onMoreInfoCLick(transaction.id)}>
      <div className={`row-item__indicator row-item__indicator__${type}`} />
      <div className={"row-item__category-icon"}>
        <img src={transaction.category.iconUrl} style={{background: transaction.category.color}} alt="category" />
      </div>
      <div>
        <div className={"row-item__title"}>{transaction.category.name}</div>
        <div className={"row-item__sub-title"}>{transaction.title}</div>
      </div>
      <div className={`row-item__amount row-item__amount__${type}`}><Amount sum={transaction.amount}/></div>
    </div>
  );
};

export default TransactionItem;
