import React from "react";
import Dropdown from "../elements/Dropdown";

interface TransactionInfoProps {
  onDeleteApprove: () => void;
  closePopupHandle: () => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const DeleteAccountPopup: React.FC<TransactionInfoProps> = ({
  onDeleteApprove,
  closePopupHandle,
  selectedOption,
  setSelectedOption,
}) => {
  const handleDelete = () => {
    onDeleteApprove();
  };

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
  }}
  options={[
    { value: "1", label: "Lost my wallet" },
    { value: "2", label: "Send money to another wallet" },
  ]}
/>

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
