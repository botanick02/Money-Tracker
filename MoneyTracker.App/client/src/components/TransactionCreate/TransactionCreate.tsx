import React, {useState} from 'react';
import InputField from "../../elements/InputField";
import Dropdown, {Option} from "../../elements/Dropdown/Dropdown";

const TransactionCreate = () => {
    const accountOptions: Option[] = [
        {
            label: "Privat",
            value: 0
        },
        {
            label: "Mono",
            value: 1
        },
        {
            label: "Cash",
            value: 2
        },
        {
            label: "Cash1",
            value: 3
        }
    ]
    const categoryOptions: Option[] = [
        {
            label: "Food and Drink",
            value: 0
        },
        {
            label: "Restaurant",
            value: 1
        },
        {
            label: "Games",
            value: 2
        },
        {
            label: "Health",
            value: 3
        }
    ]

    const [account, setAccount] = useState<Option>(accountOptions[0])

    const handleAccountChange = (option: Option) => {
        setAccount(option)
    }

    const [category, setCategory] = useState<Option>(accountOptions[0])

    const handleCategoryChange = (option: Option) => {
        setCategory(option)
    }


    return (
        <div className={"transaction-create-bg"}>
            <div className={"transaction-create"}>
                <ul className={"transaction-create__type"}>
                    <li>Income</li>
                    <li className={"current-type"}>Expense</li>
                    <li>Transfer</li>
                </ul>
                <div className={"transaction-create__fields"}>
                    <InputField type={"datetime-local"}/>
                    <Dropdown selectHandler={handleAccountChange} options={accountOptions}/>
                    <InputField type={"number"} placeholder={"Amount"}/>
                    <InputField placeholder={"Title"}/>
                    <Dropdown title={"Category"} selectHandler={handleCategoryChange} options={categoryOptions}/>
                    <InputField type={"number"} placeholder={"Note"}/>
                </div>
                <div className={"transaction-create__buttons"}>
                    <button className={"button"}>
                        Safe
                    </button>
                    <button className={"button"}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionCreate;