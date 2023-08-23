import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import AccountCreate from "./AccountCreate"; // Make sure to import the correct path
import { FETCH_ACCOUNTS } from "../../store/Account/Account.slice"; // Adjust the import accordingly

const AccountsList = () => {
  const accounts = useAppSelector((state) => state.Account.accounts);

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FETCH_ACCOUNTS()); // Use the appropriate action for fetching accounts
  }, [dispatch]);

  return (
    <main>
      <div className="account-list">
        {isCreatePopupOpen && (
          <AccountCreate
            openPopupHandle={handlePopupOpen} name={""}          />
        )}
        {accounts.map((item, index) => (
          <div key={item.id} className="account-item">
         
            <span>{item.name}</span>
          </div>
        ))}

        {!isCreatePopupOpen && (
          <div onClick={handlePopupOpen} className="new-account button">
            +
          </div>
        )}
      </div>
    </main>
  );
};

export default AccountsList;
