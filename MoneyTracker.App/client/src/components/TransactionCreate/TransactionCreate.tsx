import React, {useEffect, useState} from 'react';
import InputWrapper from "../../elements/InputWrapper";
import Dropdown, {Option} from "../../elements/Dropdown/Dropdown";
import { CategoryItemReducer } from "../../store/Example/Reducers/CategoryItemsReducer";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';

interface Props {
    openPopupHandle(): void

    transactionDefaultType: "expense" | "income" | "transfer"
}

const TransactionCreate: React.FC<Props> = ({openPopupHandle, transactionDefaultType}) => {
    const [type, setType] = useState(transactionDefaultType)
    const dispatch = useAppDispatch();
    const dateTimeTo = useAppSelector((state) => state.DateTime.dateTime)
      const { FETCH_CATEGORIES} = CategoryItemReducer.actions;
      useEffect(() => {
        dispatch(FETCH_CATEGORIES({
          dateTimeTo
    
        }));
      }, []);
      const categoryItems = useAppSelector((state) => state.Category.categories);
    const accountOptions: Option[] = [
        {
            label: "Privat",
            value: "999b9ae3-9556-41ee-a5b2-0e216fa0431p"
        },
        {
            label: "Mono",
            value: "999b9ae3-9556-41ee-a5b2-0e216fa0431M"
        },
        {
            label: "Cash",
            value: "999b9ae3-9556-41ee-a5b2-0e216fa0431C"
        }
    ]
    const categoryOptions: Option[] = categoryItems.map(category => ({
        label: category.name,
        value: category.id
      }));

    const [account, setAccount] = useState<Option>(accountOptions[0])

    const handleAccountChange = (option: Option) => {
        setAccount(option)
    }

    const [category, setCategory] = useState<Option>(accountOptions[0])

    const handleCategoryChange = (option: Option) => {
        console.log(option)
        setCategory(option)
    }

    const handleCancel = () => {
        openPopupHandle()
    }

    const handleSafe = () => {
        openPopupHandle()
    }

    const [date, setDate] = useState(new Date());


    return (
        <div className={"popup-bg"}>
            <div className={"popup"}>
                <ul className={"popup__header"}>
                    <li onClick={() => {
                        setType("income")
                    }} className={type == "income" ? "current-type" : ""}>Income
                    </li>
                    <li onClick={() => {
                        setType("expense")
                    }} className={type == "expense" ? "current-type" : ""}>Expense
                    </li>
                    <li onClick={() => {
                        setType("transfer")
                    }} className={type == "transfer" ? "current-type" : ""}>Transfer
                    </li>
                </ul>
                <div className={"popup__fields"}>
                    <InputWrapper type={"datetime-local"}>
                        <input value={date.toISOString().substring(0,16)} type="datetime-local"/>
                    </InputWrapper>
                    {
                        type != "transfer"
                            ? <Dropdown title={"Account"} selectHandler={handleAccountChange} options={accountOptions}/>
                            : <div className={"popup__row"}>
                                <Dropdown title={"From"} selectHandler={handleAccountChange} options={accountOptions}/>
                                <Dropdown title={"To"} selectHandler={handleAccountChange} options={accountOptions}/>
                            </div>
                    }
                    <InputWrapper>
                        <input type="number" placeholder="Amount"/>
                    </InputWrapper>
                    {
                        type != "transfer"
                            ? <Dropdown title={"Category"} selectHandler={handleCategoryChange}
                                        options={categoryOptions}/>
                            : <InputWrapper>
                                <input type="number" placeholder="Commission"/>
                            </InputWrapper>

                    }
                    <InputWrapper>
                        <input type="text" placeholder="Title"/>
                    </InputWrapper>
                    <InputWrapper>
                        <input type="text" placeholder="Title"/>
                    </InputWrapper>
                </div>
                <div className={"popup__row"}>
                    <button onClick={() => {
                        handleSafe()
                    }} className={"button"}>
                        Save
                    </button>
                    <button onClick={() => {
                        handleCancel()
                    }} className={"button"}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionCreate;

