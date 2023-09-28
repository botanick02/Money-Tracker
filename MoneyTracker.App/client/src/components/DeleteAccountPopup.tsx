import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import Dropdown, { Option } from "../elements/Dropdown";
import { ADD_TRANSFER_OPERATION } from "../store/FinancialOperation/FinancialOperation.slice";

interface TransactionInfoProps {
  onDeleteApprove: () => void;
  closePopupHandle: () => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  id: string;
  balance:number
}

const DeleteAccountPopup: React.FC<TransactionInfoProps> = ({
  onDeleteApprove,
  closePopupHandle,
  selectedOption,
  setSelectedOption,
  id,
  balance
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const dispatch = useAppDispatch();
  const handleDelete = () => {
    if (isOptionSelected) { 
      if (selectedOption === "2") {
        dispatch(
          ADD_TRANSFER_OPERATION({
            amount: +balance,
            categoryId: categoryGone,
            title: "Delete acc",
            fromAccountId: id,
            toAccountId: transferAccounts.toAccount.value,
            createdAt: new Date().toISOString(),
          })
        );
      }
      onDeleteApprove();
    } else {
    
      alert("Please select an option before proceeding.");
    }
  };
  
  
  const accounts = useAppSelector((state) => state.Account.accounts);
  const categories = useAppSelector((state) => state.Category.categories).filter((c) => c.isService == true)
  .filter((c) => c.isActive == true)
  const categoryGone = categories.find((c) => c.name === "Gone")?.id
  const accountOptions: Option[] = [];
  accounts
    .filter((a) => a.id !== "total")
    .filter((account) => account.isActive)
    .forEach((account) => {
      accountOptions.push({
        label: account.name,
        value: account.id,
      });
    });

  const [transferAccounts, setTransferAccounts] = useState<{
    fromAccount: string;
    toAccount: Option;
  }>({ fromAccount: id, toAccount: accountOptions[0] });

  const [showToDropdown, setShowToDropdown] = useState(false); 

  return (
    <div className={"popup-bg"} onClick={(event) => {
      event.stopPropagation();
      closePopupHandle();
    }}>
      <div className={"popup"} onClick={(event) => event.stopPropagation()}>
        <div className={`popup__header title-single`}>Deletion</div>
        <div className={"popup__fields"}>
          <h3>Are you sure you want to delete this item?</h3>
          <Dropdown
  title={"Select an option"}
  selectHandler={(selectedOption) => {
    setSelectedOption(selectedOption.value);
    setIsOptionSelected(true); 
    setShowToDropdown(selectedOption.value === "2");
  }}
  options={[
    { value: "1", label: "Lost my wallet" },
    { value: "2", label: "Send money to another wallet" },
  ]}
/>

          {showToDropdown && (
            <Dropdown
              title={"To"}
              selectHandler={(option) => {
             
                setTransferAccounts({
                  fromAccount: id,
                  toAccount: option,
                });
              }}
              options={accountOptions.filter(o => o.value !== id)}
            />
          )}
        </div>
        <div className={"popup__row"}>
          <button onClick={handleDelete} className={"button expense"}>
            Yes
          </button>
          <button onClick={closePopupHandle} className={"button"}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;