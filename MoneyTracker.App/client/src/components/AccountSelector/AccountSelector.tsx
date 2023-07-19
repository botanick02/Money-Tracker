import React, { useEffect, useState } from "react";
import CurrentAccount from "../../elements/Accounts/CurrentAccount";
import AccountListItem from "../../elements/Accounts/AccountListItem";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  FETCH_ACCOUNTS,
  SET_CURRENT_ACCOUNT_ID,
} from "../../store/Example/Reducers/AccountReducer";

const AccountSelector = () => {
  const accounts = useAppSelector((state) => state.Account.accounts);
  const currentAccountId = useAppSelector(
    (state) => state.Account.currentAccountId
  );
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    dispatch(FETCH_ACCOUNTS());
  }, []);


  const switchListState = () => {
    setIsListOpen(!isListOpen);
  };

  
  const dispatch = useAppDispatch();

  const setCurrentAccountId = (id: string) => {
    dispatch(SET_CURRENT_ACCOUNT_ID(id));
  };

  return accounts.length > 0 ? (
    <div className={"account-selector"}>
      <CurrentAccount
        account={accounts.find((a) => a.id === currentAccountId)!}
        onClick={switchListState}
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
                  key={account.id}
                  onSelected={setCurrentAccountId}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  ) : (<></>);
};

export default AccountSelector;
