import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import AccountCreate from "./AccountCreate";
import { FETCH_ACCOUNTS } from "../../store/Account/Account.slice";
import StatsTransactionItem from "../../elements/StatsTransactionItem";

const AccountsList = () => {
  const accounts = useAppSelector((state) => state.Account.accounts);

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FETCH_ACCOUNTS());
  }, [dispatch]);

 
  const accountsToRender = accounts.slice(0, accounts.length - 1);

  return (
    <main>
      <div className="transaction-list">
        {isCreatePopupOpen && (
          <AccountCreate openPopupHandle={handlePopupOpen} name="" />
        )}
        {accountsToRender.map((item) => (
          <StatsTransactionItem
            key={item.id}
            id={item.id}
            name={item.name}
            currency={item.currency.symbol}
            balance={item.balance}
          />
        ))}

        {!isCreatePopupOpen && (
          <div onClick={handlePopupOpen} className="new-transaction button">
            +
          </div>
        )}
      </div>
    </main>
  );
};

export default AccountsList;
