import React, { FC } from 'react';
import { ReactComponent as EditIcon } from "../assets/icons/Edit-icon.svg";
import { ITransactionType } from '../types/ITransactionType';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { TransactionItemsReducer } from '../store/Example/Reducers/TransactionItemsReducer';
const { CANCEL_TRANSACTION } = TransactionItemsReducer.actions;

const TransactionItem: FC<{ transaction: ITransactionType }> = ({ transaction }) => {
  const categoryItems = useAppSelector((state) => state.Category.categories);
  const category = categoryItems.find((category) => category.id === transaction.categoryId);
  const type = transaction.amount > 0 ? 'income' : 'expense';
  const dispatch = useAppDispatch();
  const handleDeleteClick = (transactionId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this transaction?");

    if (confirmed) {
        dispatch(CANCEL_TRANSACTION({ transactionId }));
      ;
    }
  };

  return (
    <div className={"row-item"}>
      <div className={`row-item__indicator row-item__indicator__${type}`} />
      <div className={"row-item__category-icon"}>
        <img src="https://picsum.photos/51" alt="category" />
      </div>
      <div>
        <div className={"row-item__title"}>{transaction.title}</div>
        <div className={"row-item__sub-title"}>{category?.name}</div>
      </div>
      <div className={`row-item__amount row-item__amount__${type}`}>{transaction.amount} $</div>
      <EditIcon
        onClick={() => {
          handleDeleteClick(transaction.transactionId)
        }}
        className={"edit-icon"} />
    </div>
  );
};

export default TransactionItem;
