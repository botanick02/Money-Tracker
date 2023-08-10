import React, { FC } from "react";
import { Account } from "../../types/Account";

const AccountListItem: FC<{
  account: Account;
  onSelected: (accountId: string) => void;
}> = ({ account, onSelected }) => {
  return (
    <div className={"account-item"} onClick={() => onSelected(account.id)}>
      <div className={"account-item__name"}>{account.name}</div>
      <div className={"account-item__balance"}>
        {account.balance}
        {account.currency.symbol}
      </div>
    </div>
  );
};

export default AccountListItem;
