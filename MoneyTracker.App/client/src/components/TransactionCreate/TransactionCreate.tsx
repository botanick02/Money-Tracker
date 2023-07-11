import React, { useEffect, useState } from 'react';
import InputWrapper from "../../elements/InputWrapper";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import { CategoryItemReducer } from "../../store/Example/Reducers/CategoryItemsReducer";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { TransactionItemsReducer } from "../../store/Example/Reducers/TransactionItemsReducer";

interface Props {
  openPopupHandle(): void
  transactionDefaultType: "expense" | "income" | "transfer"
}

const TransactionCreate: React.FC<Props> = ({ openPopupHandle, transactionDefaultType }) => {
  const [type, setType] = useState(transactionDefaultType);
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const dateTimeTo = useAppSelector((state) => state.DateTime.dateTime);
  const { FETCH_CATEGORIES } = CategoryItemReducer.actions;
  const { ADD_TRANSACTION } = TransactionItemsReducer.actions;
  useEffect(() => {
    dispatch(FETCH_CATEGORIES({
      dateTimeTo
    }));
  }, []);

  const categoryItems = useAppSelector((state) => state.Category.categories);

  const accountOptions: Option[] = [
    {
      label: "Privat",
      value: "69ae7bca-b2ed-47f1-a084-6bb08ed49a6e"
    },
    {
      label: "Mono",
      value: "bc62fbf1-0f5c-4cc0-b995-7573ad855e8d"
    },
    {
      label: "Cash",
      value: "4856a9ed-4045-4848-a9b4-b3b36404c69f"
    }
  ];

  const mocAccountSOptions = {
    Income: "0c5c3b75-6094-4156-8c2f-6e0ac5b89fcb",
    Expense: "7c494473-5889-4d7f-81cc-7f94f5c8cc90"
  };

  const categoryOptions: Option[] = categoryItems.map(category => ({
    label: category.name,
    value: category.id
  }));

  const [account, setAccount] = useState<Option>(accountOptions[0]);
  const [fromAccountId, setFromAccountId] = useState(account.value);
  const [toAccountId, setToAccountId] = useState(mocAccountSOptions.Expense);

  const handleAccountChange = (option: Option) => {
    setAccount(option);
    console.log(option)
    if (type === "income") {
        console.log(option.value)
      setFromAccountId(mocAccountSOptions.Income);
      setToAccountId(String(option));
    } else if (type === "expense") {
    console.log(option.value)
      setFromAccountId(String(option));
      setToAccountId(mocAccountSOptions.Expense);

    }
  };


  const [categoryId, setCategoryId] = useState<Option>(accountOptions[0]);

  const handleCategoryChange = (option: Option) => {
     setCategoryId(option);
  };

  const handleCancel = () => {
    openPopupHandle();
  };

  const handleSave = () => {
    console.log("fromAccountId:", fromAccountId);
  
   
    dispatch(
      ADD_TRANSACTION({
        amount,
        categoryId,
        title,
        fromAccountId,
        toAccountId
      })
    );
    openPopupHandle();
  };

  const [date, setDate] = useState(new Date());

  return (
    <div className={"popup-bg"}>
      <div className={"popup"}>
        <ul className={"popup__header"}>
          <li onClick={() => {
            setType("income");
          }} className={type === "income" ? "current-type" : ""}>Income
          </li>
          <li onClick={() => {
            setType("expense");
          }} className={type === "expense" ? "current-type" : ""}>Expense
          </li>
          <li onClick={() => {
            setType("transfer");
          }} className={type === "transfer" ? "current-type" : ""}>Transfer
          </li>
        </ul>
        <div className={"popup__fields"}>
          <InputWrapper type={"datetime-local"}>
            <input value={date.toISOString().substring(0, 16)} type="datetime-local" onChange={(e) => setDate(new Date(e.target.value))} />
          </InputWrapper>
          {
            type !== "transfer" ? (
              <Dropdown title={"Account"} selectHandler={handleAccountChange} options={accountOptions} />
            ) : (
              <div className={"popup__row"}>
                <Dropdown title={"From"} selectHandler={handleAccountChange} options={accountOptions} />
                <Dropdown title={"To"} selectHandler={handleAccountChange} options={accountOptions} />
              </div>
            )
          }
          <InputWrapper>
            <input type="number" placeholder="Amount" onChange={(e) => setAmount(Number(e.target.value))} />
          </InputWrapper>
          {
            type !== "transfer" ? (
              <Dropdown title={"Category"} selectHandler={handleCategoryChange} options={categoryOptions} />
            ) : (
              <InputWrapper>
                <input type="number" placeholder="Commission" />
              </InputWrapper>
            )
          }
          <InputWrapper>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          </InputWrapper>
          <InputWrapper>
            <input type="text" placeholder="Note" />
          </InputWrapper>
        </div>
        <div className={"popup__row"}>
          <button onClick={handleSave} className={"button"}>
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
