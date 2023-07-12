import React, { useEffect, useState } from "react";
import CurrentAccount from "../../elements/Accounts/CurrentAccount";
import { Account } from "../../types/Account";
import { default as test } from "./testData.json";
import AccountListItem from "../../elements/Accounts/AccountListItem";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { SET_ACTUAL_ACCOUNT } from "../../store/Example/Reducers/AccountReducer";

const AccountSelector = () => {
  const accounts = test as Account[];
  const [currentAccountId, setCurrentAccountId] = useState(
    accounts.find((a) => a.name === "Total")?.id
  );
  const [isListOpen, setIsListOpen] = useState(false);
const transactions = useAppSelector((state) => state.TransactionItems.transactions);
  const switchListState = () => {
    setIsListOpen(!isListOpen);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SET_ACTUAL_ACCOUNT(currentAccountId || "645645646"));
  }, [currentAccountId,transactions]);

  const actualBalance = useAppSelector((state) => state.Account.actualBalance);


  return (
    <div className={"account-selector"}>
      <CurrentAccount
        account={accounts.find((a) => a.id === currentAccountId)!}
        onClick={switchListState}
        actualBalance={actualBalance}
      />

      {isListOpen && (
        <div
          className={"account-selector__list-bg"}
          onClick={() => setIsListOpen(false)}
        >
          <div className={"account-selector__list"}>
            {accounts
              .filter((a) => a.id !== currentAccountId)
              .map((account) => (
                <AccountListItem
                  account={account}
                  actualBalance={actualBalance}
                  key={account.id}
                  onSelected={setCurrentAccountId}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSelector;
