import { ReactComponent as EditIcon } from "../../assets/icons/Edit-icon.svg";
import { Transaction } from "../../types/Transaction";
import { Account } from "../../types/Account";
import { useAppSelector } from "../../hooks/useAppDispatch";

interface TransactionViewProps {
  transaction: Transaction;
  accounts: Account[];
  onEditClick(): void;
  onDeleteClick(): void;
  onClosePopupClick(): void;
}

const TransactionView = ({
  transaction,
  accounts,
  onEditClick,
  onDeleteClick,
  onClosePopupClick,
}: TransactionViewProps) => {
  const type = transaction.amount > 0 ? "income" : "expense";

  const timeTravelValue = useAppSelector((state) => state.TimeTravel.datetime);

  return (
    <>
      <div className={"popup__info"}>
        <div className={`popup__info__amount ${type}`}>
          {transaction.amount} ₴
        </div>
        {transaction.title && (
          <div className={"popup__info__item"}>Title: {transaction.title}</div>
        )}
        <div className={"popup__info__item"}>
          Created: {new Date(transaction.createdAt).toLocaleString()}
        </div>
        {transaction.category.type === "transfer" ? (
          <>
            <div className={"popup__info__item"}>
              From account:{" "}
              {accounts.find((a) => a.id === transaction.fromAccountId)?.name}
            </div>
            <div className={"popup__info__item"}>
              To account:{" "}
              {accounts.find((a) => a.id === transaction.accountId)?.name}
            </div>
          </>
        ) : (
          <div className={"popup__info__item"}>
            Account:{" "}
            {accounts.find((a) => a.id === transaction.accountId)?.name}
          </div>
        )}

        {transaction.note && (
          <div className={"popup__info__item"}>Note: {transaction.note}</div>
        )}

        {!timeTravelValue && (
          <EditIcon
            onClick={onEditClick}
            className={"popup__info__edit-icon"}
          />
        )}
      </div>
      <div className={"popup__row"}>
        {!timeTravelValue && (
          <button onClick={onDeleteClick} className={"button expense"}>
            Delete
          </button>
        )}
        <button onClick={onClosePopupClick} className={"button"}>
          Close
        </button>
      </div>
    </>
  );
};

export default TransactionView;
