import React, { useState } from "react";
import TransactionItem from "../../elements/TransactionItem";
import { useAppSelector } from "../../hooks/useAppDispatch";
import TransactionInfo from "./TransactionInfo";

const getOnlyDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const TransactionList = () => {
  let transactions = useAppSelector(
    (state) => state.FinancialOperation.transactions
  );
  
  const currentAccountId = useAppSelector(
    state => state.Account.currentAccountId
  )

  const [transactionIdInfoPopup, setTransactionIdInfoPopup] = useState<string | null>(null)

  const handleInfoPopupOpen = (id: string) => {
    document.body.classList.toggle("no-scroll");
    setTransactionIdInfoPopup(id);
  };

  const transactionInPopup = transactions.find(t => t.id === transactionIdInfoPopup);

  if (currentAccountId === "total"){
    transactions = transactions.filter(t => t.category.type !== "transfer")
  }

  return (
    <div className={"transaction-list"}>
      {transactionInPopup && (
        <TransactionInfo closePopupHandle={() => setTransactionIdInfoPopup(null)} transaction={transactionInPopup}
        />
      )}
      {transactions.length > 0 ? transactions.map((item, index) => {
        if (
          index === 0 ||
          getOnlyDate(transactions[index - 1]?.createdAt) !==
            getOnlyDate(item.createdAt)
        ) {
          return (
            <React.Fragment key={index}>
              <div className={"row-title"}>{getOnlyDate(item.createdAt)}</div>
              <TransactionItem transaction={item} onMoreInfoCLick={handleInfoPopupOpen}/>
            </React.Fragment>
          );
        }
        return <TransactionItem key={index} transaction={item} onMoreInfoCLick={handleInfoPopupOpen}/>;
      }) : <div  className={"transaction-list__message-empty"}>No transactions to show</div>}
    </div>
  );
};

export default TransactionList;
