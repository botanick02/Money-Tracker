import React, { FC } from "react";
import { Account } from "../../types/Account";
import Amount from "../Amount";

const CurrentAccount: FC<{
  account: Account;
  onClick: () => void;
}> = ({ account, onClick }) => {
  return (
    <div className={"account-current"} onClick={onClick}>
      <div className={"account-current__name"}>{account.name} ▼</div>
      <div className={"account-current__balance"}>
        <Amount sum={account.balance}/>
      </div>
    </div>
  );
};

export default CurrentAccount;
