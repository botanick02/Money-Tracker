import React, { useEffect, useState } from "react";
import InputWrapper from "../../elements/InputWrapper";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ADD_CREDIT_OPERATION, ADD_DEBIT_OPERATION, ADD_TRANSFER_OPERATION } from "../../store/FinancialOperation/FinancialOperation.slice";
import { FETCH_CATEGORIES } from "../../store/Category/Category.slice";
interface Props {
  openPopupHandle(): void;
  transactionDefaultType: "expense" | "income" | "transfer";
}

const TransactionCreate: React.FC<Props> = ({
  openPopupHandle,
  transactionDefaultType,
}) => {
  const [type, setType] = useState(transactionDefaultType);
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  
  const dispatch = useAppDispatch();
  const categoryItems = useAppSelector((state) => state.Category.categories);
  const accounts = useAppSelector((state) => state.Account.accounts);

  const accountOptions: Option[] = [];
  accounts
    .filter((a) => a.id !== "total")
    .forEach((account) => {
      accountOptions.push({
        label: account.name,
        value: account.id,
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
    }>({ fromAccount: accountOptions[0], toAccount: accountOptions[0]});

    const categoryOptions: Option[] = categoryItems.map((category) => ({
      label: category.name,
      value: category.id,
    }));

  const [categoryId, setCategoryId] = useState<Option>(
    categoryOptions[0]
  );

  const handleCategoryChange = (option: Option) => {
    setCategoryId(option);
  };

  const handleCancel = () => {
    openPopupHandle();
  };

  const handleFinancialOperation = () => {
    switch(type){
      case "income": {
        dispatch(
          ADD_DEBIT_OPERATION({
            amount,
            categoryId: categoryId.value,
            title,
            toAccountId: account.value
          }));
          break
      }
      case "expense": {
        dispatch(
          ADD_CREDIT_OPERATION({
            amount,
            categoryId: categoryId.value,
            title,
            fromAccountId: account.value
          }));
          break
      }
      case "transfer":{
        dispatch(
          ADD_TRANSFER_OPERATION({
            amount,
            categoryId: categoryId.value,
            title,
            fromAccountId: transferAccounts.fromAccount.value,
            toAccountId: transferAccounts.toAccount.value
          }));
      }
    }
    
    openPopupHandle();
  };

  return (
    <div className={"popup-bg"}>
      <div className={"popup"}>
        <ul className={"popup__header"}>
          <li
            onClick={() => {
              setType("income");
            }}
            className={type === "income" ? "current-type" : ""}
          >
            Income
          </li>
          <li
            onClick={() => {
              setType("expense");
            }}
            className={type === "expense" ? "current-type" : ""}
          >
            Expense
          </li>
          <li
            onClick={() => {
              setType("transfer");
            }}
            className={type === "transfer" ? "current-type" : ""}
          >
            Transfer
          </li>
        </ul>
        <div className={"popup__fields"}>
          {type !== "transfer" ? (
            <Dropdown
              title={"Account"}
              selectHandler={setAccount}
              options={accountOptions}
            />
          ) : (
            <div className={"popup__row"}>
              <Dropdown
                title={"From"}
                selectHandler={(option) => setTransferAccounts({fromAccount: option, toAccount: transferAccounts.toAccount})}
                options={accountOptions}
              />
              <Dropdown
                title={"To"}
                selectHandler={(option) => setTransferAccounts({fromAccount: transferAccounts.fromAccount, toAccount: option})}
                options={accountOptions}
              />
            </div>
          )}
          <InputWrapper>
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </InputWrapper>
          {type !== "transfer" ? (
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
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputWrapper>
        </div>
        <div className={"popup__row"}>
          <button onClick={handleFinancialOperation} className={"button"}>
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
