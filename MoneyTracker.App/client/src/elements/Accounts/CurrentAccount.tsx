import React, { FC, useState } from "react";
import { Account } from "../../types/Account";

const CurrentAccount: FC<{ account: Account;  actualBalance:number; onClick: () => void }> = ({
  account,
  actualBalance,
  onClick,
}) => {
  return (
    <div className={"account-current"} onClick={onClick}>
      <div className={"account-current__name"}>{account.name} ▼</div>
      <div className={"account-current__balance"}>
        {actualBalance} {account.currency}
      </div>
    </div>
  );
};

export default CurrentAccount;
