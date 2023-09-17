import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import AccountCreate from "./AccountCreate";
import { FETCH_ACCOUNTS } from "../../store/Account/Account.slice";
import StatsTransactionItem from "../../elements/StatsTransactionItem";

const AccountsList = () => {
  const accounts = useAppSelector((state) => state.Account.accounts);
  const inactiveAccounts = accounts.filter((account) => !account.isActive && account.name !== "Total");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const [showInactiveAccountsList, setShowInactiveAccounts] = useState(false);

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FETCH_ACCOUNTS());
  }, [dispatch]);


  const activeAccounts = accounts.filter((account) => account.isActive);

  return (
    <main>
    <div className="transaction-list">
      {isCreatePopupOpen && (
        <AccountCreate openPopupHandle={handlePopupOpen} name="" />
      )}

      {activeAccounts.map((item) => (
        <StatsTransactionItem
          key={item.id}
          id={item.id}
          name={item.name}
          currency={item.currency}
          balance={item.balance}
          isActive={item.isActive}
        />
      ))}

      {!isCreatePopupOpen && (
        <div onClick={handlePopupOpen} className="new-transaction button">
          +
        </div>
      )}

      <button
        onClick={() => setShowInactiveAccounts(!showInactiveAccountsList)}
        className="transaction-sums__filter"
        style={{
          width: '100%',
          overflowX: 'auto',
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <span style={{ fontSize: '20px', paddingRight: '10px' }}>
          {showInactiveAccountsList ? '▼' : '▲'}
        </span>
        {showInactiveAccountsList ? 'Hide deleted accounts' : 'Show deleted accounts'}
        <span style={{ fontSize: '20px', paddingLeft: '10px' }}>
          {showInactiveAccountsList ? '▼' : '▲'}
        </span>
      </button>

      {showInactiveAccountsList && (
      
        <div className="transaction-list">
          {inactiveAccounts.map((item) => (
            <StatsTransactionItem
              key={item.id}
              id={item.id}
              name={item.name}
              currency={item.currency}
              balance={item.balance}
              isActive={item.isActive}
            />
          ))}
        </div>
      )}
    </div>
  </main>
  );
};

export default AccountsList;
