import React, { useState } from "react";
import { Transaction } from "../../types/Transaction";
import DeletePopup from "../DeletePopup";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  CANCEL_FINANCIAL_OPERATION,
  TransactionTypes,
  UPDATE_FINANCIAL_OPERATION,
  UpdateFinancialOperation,
} from "../../store/FinancialOperation/FinancialOperation.slice";
import TransactionView from "./TransactionView";
import TransactionEdit from "./TransactionEdit";

interface TransactionInfoProps {
  closePopupHandle(): void;
  transaction: Transaction;
}

const TransactionInfo = ({
  closePopupHandle,
  transaction,
}: TransactionInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const dispatch = useAppDispatch();

  const categoryItems = useAppSelector((state) => state.Category.categories);
  const accounts = useAppSelector((state) => state.Account.accounts).filter(
    (a) => a.id !== "total"
  );

  const type = transaction.amount > 0 ? TransactionTypes.Income : TransactionTypes.Expense;

  const categoryOptions = categoryItems
    .filter((c) => c.type === type)
    .map((category) => ({
      label: category.name,
      value: category.id,
    }));

  const accountOptions = accounts.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const confirmDeletion = () => {
    dispatch(
      CANCEL_FINANCIAL_OPERATION({ operationId: transaction.operationId })
    );
  };

  const saveOperation = (data: UpdateFinancialOperation) => {
    dispatch(
      UPDATE_FINANCIAL_OPERATION({
        operationId: transaction.operationId,
        amount: +data.amount,
        title: data.title,
        categoryId: data.categoryId,
        note: data.note,
        createdAt: new Date(data.createdAt).toISOString(),
        fromAccountId: data.fromAccountId,
        toAccountId: data.toAccountId,
      })
    );
  };

  return (
    <div className={"popup-bg"} onClick={closePopupHandle}>
      {isDeletePopupOpen && (
        <DeletePopup
          onDeleteApprove={confirmDeletion}
          closePopupHandle={() => setIsDeletePopupOpen(false)}
        />
      )}
      <div className={"popup"} onClick={(event) => event.stopPropagation()}>
        <div className={`popup__header title-single ${type === TransactionTypes.Expense ? "expense" : "income"}`}>
          {isEditMode ? "Edit" : transaction.category.name}
        </div>
        {isEditMode ? (
          <TransactionEdit
            transaction={transaction}
            categoryOptions={categoryOptions}
            accountOptions={accountOptions}
            onSave={saveOperation}
            onCancel={() => setIsEditMode(false)}
          />
        ) : (
          <TransactionView
            transaction={transaction}
            accounts={accounts}
            onEditClick={() => setIsEditMode(true)}
            onDeleteClick={() => setIsDeletePopupOpen(true)}
            onClosePopupClick={() => closePopupHandle()}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionInfo;
