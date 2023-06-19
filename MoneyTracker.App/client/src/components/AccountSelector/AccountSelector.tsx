import React, { useState } from "react";
import CurrentAccount from "../../elements/Accounts/CurrentAccount";
import { Account } from "../../types/Account";
import { default as test } from "./testData.json";
import AccountListItem from "../../elements/Accounts/AccountListItem";

const AccountSelector = () => {
  const accounts = test as Account[];
  const [currentAccountId, setCurrentAccountId] = useState(
    accounts.find((a) => a.name === "Total")?.id
  );
  const [isListOpen, setIsListOpen] = useState(false);

  const switchListState = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <div className={"account-selector"}>
      <CurrentAccount
        account={accounts.find((a) => a.id === currentAccountId)!}
        onClick={switchListState}
      />

      {isListOpen && (
        <div className={"account-selector__list-bg"} onClick={() => setIsListOpen(false)}>
          <div className={"account-selector__list"}>
            {accounts
              .filter((a) => a.id !== currentAccountId)
              .map((account) => (
                <AccountListItem
                  account={account}
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
