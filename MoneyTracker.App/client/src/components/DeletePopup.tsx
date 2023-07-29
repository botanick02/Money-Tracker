import React from "react";

interface TransactionInfoProps {
  onDeleteApprove: () => void;
  closePopupHandle: () => void;
}

const DeletePopup = ({
  onDeleteApprove,
  closePopupHandle,
}: TransactionInfoProps) => {
  return (
    <div className={"popup-bg"}>
      <div className={"popup"}>
        <div className={`popup__header title-single`}>Deletion</div>
        <div className={"popup__fields"}>
          <h3>Are you sure you want to delete this item?</h3>
        </div>
        <div className={"popup__row"}>
          <button onClick={onDeleteApprove} className={"button expense"}>
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

export default DeletePopup;
