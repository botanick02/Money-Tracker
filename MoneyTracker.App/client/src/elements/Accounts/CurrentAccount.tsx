import React, { FC } from "react";
import { Account } from "../../types/Account";

const CurrentAccount: FC<{
  account: Account;
  onClick: () => void;
}> = ({ account, onClick }) => {
  return (
    <div className={"account-current"} onClick={onClick}>
      <div className={"account-current__name"}>{account.name} ▼</div>
      <div className={"account-current__balance"}>
        {account.balance} {account.currency.symbol}
      </div>
    </div>
  );
};

export default CurrentAccount;
