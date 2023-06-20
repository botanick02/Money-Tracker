import React, {useState} from 'react';
import InputField from "../../elements/InputField";
import Dropdown, {Option} from "../../elements/Dropdown/Dropdown";


interface Props {
    openPopupHandle(): void

    transactionDefaultType: "expense" | "income" | "transfer"
}

const TransactionCreate: React.FC<Props> = ({openPopupHandle, transactionDefaultType}) => {
    const [type, setType] = useState(transactionDefaultType)

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
            icon: "https://picsum.photos/50",
            label: "Food and Drink",
            value: 0
        },
        {
            icon: "https://picsum.photos/51",
            label: "Restaurant",
            value: 1
        },
        {
            icon: "https://picsum.photos/52",
            label: "Games",
            value: 2
        },
        {
            icon: "https://picsum.photos/53",
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

    const handleCancel = () => {
        openPopupHandle()
    }

    const handleSafe = () => {
        openPopupHandle()
    }


    return (
        <div className={"transaction-create-bg"}>
            <div className={"transaction-create"}>
                <ul className={"transaction-create__type"}>
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
                <div className={"transaction-create__fields"}>
                    <InputField type={"datetime-local"}/>
                    {
                        type != "transfer"
                            ? <Dropdown title={"Account"} selectHandler={handleAccountChange} options={accountOptions}/>
                            : <div className={"transaction-create__row"}>
                                <Dropdown title={"From"} selectHandler={handleAccountChange} options={accountOptions}/>
                                <Dropdown title={"To"} selectHandler={handleAccountChange} options={accountOptions}/>
                            </div>
                    }
                    <InputField type={"number"} placeholder={"Amount"}/>
                    {
                        type != "transfer"
                            ? <Dropdown title={"Category"} selectHandler={handleCategoryChange}
                                        options={categoryOptions}/>
                            : <InputField type={"number"} placeholder={"Commission"}/>

                    }
                    <InputField placeholder={"Title"}/>
                    <InputField placeholder={"Note"}/>
                </div>
                <div className={"transaction-create__row"}>
                    <button onClick={() => {
                        handleSafe()
                    }} className={"button"}>
                        Safe
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