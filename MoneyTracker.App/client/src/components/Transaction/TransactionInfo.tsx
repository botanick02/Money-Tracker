import React, { useState } from "react";
import { Transaction } from "../../types/Transaction";
import DeletePopup from "../DeletePopup";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  CANCEL_FINANCIAL_OPERATION,
  UPDATE_FINANCIAL_OPERATION,
} from "../../store/FinancialOperation/FinancialOperation.slice";
import { ReactComponent as EditIcon } from "../../assets/icons/Edit-icon.svg";
import InputWrapper from "../../elements/InputWrapper";
import { useForm } from "react-hook-form";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import { getISODateTimeValue } from "../../tools/Dates/currentIsoDates";

interface formFields {
  operationId: string;
  title: string;
  amount: number;
  note: string | null;
  createdAt: string;
}

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

  const categoryItems = useAppSelector((state) => state.Category.categories);

  const accounts = useAppSelector((state) => state.Account.accounts).filter(
    (a) => a.id !== "total"
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formFields>({
    defaultValues: {
      title: transaction.title,
      amount: Math.abs(transaction.amount),
      createdAt: getISODateTimeValue(new Date(transaction.createdAt)),
      note: transaction.note,
    },
  });

  const type = transaction.amount > 0 ? "income" : "expense";

  const dispatch = useAppDispatch();

  const categoryOptions: Option[] = categoryItems.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountOptions: Option[] = accounts.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const handleCategoryChange = (option: Option) => {
    setCategoryId(option);
  };

  const handleAccountChange = (option: Option) => {
    setAccount(option);
  };

  const [categoryId, setCategoryId] = useState<Option>(
    categoryOptions.find((o) => o.value === transaction.category.id)!
  );

  const [account, setAccount] = useState<Option>(
    accountOptions.find((option) => option.value === transaction.accountId) ??
      accountOptions[0]
  );

  const confirmDeletion = () => {
    dispatch(
      CANCEL_FINANCIAL_OPERATION({ operationId: transaction.operationId })
    );
  };

  const saveOperation = (data: any) => {
    dispatch(
      UPDATE_FINANCIAL_OPERATION({
        operationId: transaction.operationId,
        amount: +data.amount,
        title: data.title,
        categoryId: categoryId.value,
        note: data.note,
        createdAt: new Date(data.createdAt).toISOString(),
        fromAccountId: account.value,
        toAccountId: account.value,
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
        <div className={`popup__header title-single ${type}`}>
          {isEditMode ? "Edit" : transaction.category.name}
        </div>

        {isEditMode ? (
          <div className={"popup__fields"}>
            <div className={"popup__fields__amount"}>
              {transaction.amount < 0 && "-"}
              <InputWrapper>
                <input
                  type="number"
                  placeholder="Amount"
                  {...register("amount", {
                    required: "Amount is required",
                  })}
                />
                {errors.amount && <span>{errors.amount.message}</span>}
              </InputWrapper>
              ₴
            </div>
            <InputWrapper>
              <input type="text" placeholder="Title" {...register("title")} />
            </InputWrapper>
            <InputWrapper>
              <input
                type="datetime-local"
                placeholder="Transaction time"
                {...register("createdAt", {
                  required: "Transaction time is required",
                })}
              />
            </InputWrapper>
            <Dropdown
              title={"Category"}
              selectHandler={handleCategoryChange}
              options={categoryOptions}
              defaultOptionIndex={
                categoryOptions.findIndex(
                  (o) => o.value === transaction.category.id
                ) + 1
              }
            />
            <Dropdown
              title={"Account"}
              selectHandler={handleAccountChange}
              options={accountOptions}
              defaultOptionIndex={
                accountOptions.findIndex(
                  (o) => o.value === transaction.accountId
                ) + 1
              }
            />
            <InputWrapper>
              <input type="text" placeholder="Note" {...register("note")} />
            </InputWrapper>
          </div>
        ) : (
          <div className={"popup__info"}>
            <div className={`popup__info__amount ${type}`}>
              {transaction.amount} ₴
            </div>
            {transaction.title && (
              <div className={"popup__info__item"}>
                Title: {transaction.title}
              </div>
            )}
            <div className={"popup__info__item"}>
              Created: {new Date(transaction.createdAt).toLocaleString()}
            </div>
            <div className={"popup__info__item"}>
              Account:{" "}
              {accounts.find((a) => a.id === transaction.accountId)?.name}
            </div>
            {transaction.note && (
              <div className={"popup__info__item"}>
                Note: {transaction.note}
              </div>
            )}
            <EditIcon
              onClick={() => setIsEditMode(true)}
              className={"popup__info__edit-icon"}
            />
          </div>
        )}
        {isEditMode ? (
          <div className={"popup__row"}>
            <button onClick={handleSubmit(saveOperation)} className={"button"}>
              Save
            </button>
            <button onClick={() => setIsEditMode(false)} className={"button"}>
              Cancel
            </button>
          </div>
        ) : (
          <div className={"popup__row"}>
            <button
              onClick={() => setIsDeletePopupOpen(true)}
              className={"button expense"}
            >
              Delete
            </button>
            <button onClick={closePopupHandle} className={"button"}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionInfo;
