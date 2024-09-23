import React, { useState } from "react";
import InputWrapper from "../../elements/InputWrapper";
import Dropdown, { Option } from "../../elements/Dropdown";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  ADD_CREDIT_OPERATION,
  ADD_DEBIT_OPERATION,
  ADD_TRANSFER_OPERATION,
  TransactionTypes,
} from "../../store/FinancialOperation/FinancialOperation.slice";
import { useForm } from "react-hook-form";
import { getCurrentISODateTimeValue } from "../../tools/Dates/currentIsoDates";

interface FormFields {
  title: string;
  amount: number;
  note: string | null;
  createdAt: string;
}

interface Props {
  closePopupHandle(): void;
}

const TransactionCreate: React.FC<Props> = ({ closePopupHandle }) => {
  const transactionType = useAppSelector(
    (state) => state.FinancialOperation.transactionType
  );

  const [type, setType] = useState<TransactionTypes>(
    transactionType ?? TransactionTypes.Expense
  );

  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      createdAt: getCurrentISODateTimeValue(),
    },
  });

  const dispatch = useAppDispatch();
  const categoryItems = useAppSelector(
    (state) => state.Category.categories
  ).filter((t) => t.isActive == true);
  const accounts = useAppSelector((state) => state.Account.accounts);

  const accountOptions: Option[] = [];
  accounts
    .filter((a) => a.id !== "total")
    .filter((account) => account.isActive)
    .forEach((account) => {
      accountOptions.push({
        label: account.name,
        value: account.id,
        currency:account.currency.code
       
      });
    });

  const currentAccountId = useAppSelector(
    (state) => state.Account.currentAccountId
  );

  const [account, setAccount] = useState<Option>(
    accountOptions.find((option) => option.value === currentAccountId) ||
      accountOptions[0]
  );

  const [transferAccounts, setTransferAccounts] = useState<{
    fromAccount: Option;
    toAccount: Option;
  }>({ fromAccount: accountOptions[0], toAccount: accountOptions[0] });

  const categoryOptions: Option[] = categoryItems
    .filter((c) => c.type === type)
    .map((category) => ({
      label: category.name,
      value: category.id,
    }));

  const [categoryId, setCategoryId] = useState<Option>(categoryOptions[0]);

  const handleCategoryChange = (option: Option) => {
    setCategoryId(option);
  };

  const handleCancel = () => {
 
    closePopupHandle();
  };
 
  const addFinancialOperation = (data: FormFields) => {
    switch (type) {
      case TransactionTypes.Income: {
        dispatch(
          ADD_DEBIT_OPERATION({
            amount: +data.amount,
            categoryId: categoryId.value,
            title: data.title,
            toAccountId: account.value,
            createdAt: new Date(data.createdAt).toISOString(),
          })
        );
        break;
      }
      case TransactionTypes.Expense: {
        dispatch(
          ADD_CREDIT_OPERATION({
            amount: +data.amount,
            categoryId: categoryId.value,
            title: data.title,
            fromAccountId: account.value,
            createdAt: new Date(data.createdAt).toISOString(),
          })
        );
        break;
      }
      case TransactionTypes.Transfer: {
        dispatch(
          ADD_TRANSFER_OPERATION({
            amount: +data.amount,
            categoryId: categoryId.value,
            title: data.title,
            fromAccountId: transferAccounts.fromAccount.value,
            toAccountId: transferAccounts.toAccount.value,
            createdAt: new Date(data.createdAt).toISOString(),
          })
        );
      }
    }
    closePopupHandle();
  };

  return (
    <div className={"popup-bg"} onClick={closePopupHandle}>
      <div className={"popup"} onClick={(event) => event.stopPropagation()}>
        <ul className={"popup__header"}>
          <li
            onClick={() => {
              setType(TransactionTypes.Income);
            }}
            className={type === TransactionTypes.Income ? "current-type" : ""}
          >
            Income
          </li>
          <li
            onClick={() => {
              setType(TransactionTypes.Expense);
            }}
            className={type === TransactionTypes.Expense ? "current-type" : ""}
          >
            Expense
          </li>
          <li
            onClick={() => {
              setType(TransactionTypes.Transfer);
            }}
            className={type === TransactionTypes.Transfer ? "current-type" : ""}
          >
            Transfer
          </li>
        </ul>
        <div className={"popup__fields"}>
          {type !== TransactionTypes.Transfer ? (
            <Dropdown
              title={"Account"}
              selectHandler={setAccount}
              options={accountOptions}
            />
          ) : (
            <div className={"popup__row"}>
              <Dropdown
                title={"From"}
                selectHandler={(option) =>
                  setTransferAccounts({
                    fromAccount: option,
                    toAccount: transferAccounts.toAccount,
                  })
                }
                options={accountOptions.filter(
                  (o) => o.value !== transferAccounts.toAccount.value
                )}
              />
              <Dropdown
                title={"To"}
                selectHandler={(option) =>
                  setTransferAccounts({
                    fromAccount: transferAccounts.fromAccount,
                    toAccount: option,
                  })
                }
                options={accountOptions.filter(
                  (o) => o.value !== transferAccounts.fromAccount.value
                )}
              />
            </div>
          )}
       {type === TransactionTypes.Transfer &&( transferAccounts.fromAccount.currency !==  transferAccounts.toAccount.currency ) ? (
  <div className="popup__row">
    <InputWrapper>
      <input
        type="number"
        placeholder="Amount"
        {...register("amount", {
          required: "Amount is required",
        })}
      />
    </InputWrapper>
    <InputWrapper>
      <input
        type="number"
        placeholder="Amount in other currency "
        {...register("amount", {
          required: "Amount is required",
        })}
      />
    </InputWrapper>
  </div>
) : (
  <InputWrapper>
    <input
      type="number"
      placeholder="Amount"
      {...register("amount", {
        required: "Amount is required",
      })}
    />
  </InputWrapper>
)}



          {type !== TransactionTypes.Transfer ? (
            <Dropdown
              title={"Category"}
              selectHandler={handleCategoryChange}
              options={categoryOptions}
            />
          ) : (
            <InputWrapper>
              <input type="number" placeholder="Commission" />
            </InputWrapper>
          )}
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
          <InputWrapper>
            <input type="text" placeholder="Note" {...register("note")} />
          </InputWrapper>
        </div>
        <div className={"popup__row"}>
          <button
            onClick={handleSubmit(addFinancialOperation)}
            className={"button"}
          >
            Save
          </button>
          <button onClick={handleCancel} className={"button"}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCreate;
