import React, { useState } from "react";
import { Account } from "../../types/Account";

interface CurrentAccountProps {
  account: Account;
}

const CurrentAccount = ({ account }: CurrentAccountProps) => {
  return (
    <div className={"header__account"}>
      <div className={"header__account__name"}>{account.name} ▼</div>
      <div className={"header__account__balance"}>
        {account.balance} {account.currency}
      </div>
    </div>
  );
};

export default CurrentAccount;
