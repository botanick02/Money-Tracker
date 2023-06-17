import React from 'react';
import InputField from "../../elements/InputField";

const TransactionCreate = () => {
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
                    <InputField type={"number"} placeholder={"Account"}/>
                    <InputField type={"number"} placeholder={"Amount"}/>
                    <InputField type={"number"} placeholder={"Title"}/>
                    <InputField type={"number"} placeholder={"Category"}/>
                    <InputField type={"number"} placeholder={"Note"}/>
                </div>
                <div className={"transaction-create__buttons"}>
                    <button>
                        Safe
                    </button>
                    <button>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionCreate;