import React, { FC, useState, useEffect } from 'react';
import { DELETE_ACCOUNT } from '../store/Account/Account.slice';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { ReactComponent as DeleteIcon } from "../assets/icons/Delete-icon.svg";
import { Currency } from '../types/Currency';
import DeleteAccountPopup from '../components/DeleteAccountPopup';
import Currencies from '../components/Accounts/Currencies.json'

const getTwoLetterCodeAsync = async (code:string) => {
  for (const currency of Currencies) {
    if (currency.code === code) {
      return `https://flagcdn.com/${currency.two_letter_code.toLocaleLowerCase()}.svg`;
    }
  }

  return "";
};

interface StatsTransactionItemProps {
  id: string;
  name: string;
  currency: Currency;
  balance: number;
  isActive?: boolean;
}

const StatsTransactionItem: FC<StatsTransactionItemProps> = ({ id, name, currency, balance, isActive }) => {
  const dispatch = useAppDispatch();
  const [icon, setIcon] = useState("");
  const [accountOnDeletionId, setAccountOnDeletionId] = useState<string | null>(null);
  const [selectedPopupOption, setSelectedPopupOption] = useState<string>("1");
  const categories = useAppSelector((state) => state.Category.categories).filter((c) => c.isService == true)
  .filter((c) => c.isActive == true)
  const categoryGone = categories.find((c) => c.name === "Gone")?.id


  useEffect(() => {
    const fetchIcon = async () => {
      const iconUrl = await getTwoLetterCodeAsync(currency.code);
      setIcon(iconUrl);
    };

    if (currency) {
      fetchIcon();
    }
  }, [currency]);

  const handleSelectedOptionChange = (option: string) => {
    setSelectedPopupOption(option);
  };

  const confirmDeletion = () => {
   
    if (accountOnDeletionId) {
        console.log(selectedPopupOption)
   
   
      dispatch(DELETE_ACCOUNT({ accountID: id }));
    }
    setAccountOnDeletionId(null);
  };

  return (
    <div className="row-item">
      {accountOnDeletionId && (
        <DeleteAccountPopup
          onDeleteApprove={confirmDeletion}
          closePopupHandle={() => setAccountOnDeletionId(null)}
          selectedOption={selectedPopupOption}
          setSelectedOption={handleSelectedOptionChange}
          id={id}
          balance={balance}
        />
      )}
      <div className="row-item__indicator row-item__indicator__currency" />
      <div className="row-item__category-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={icon} alt="Flag" />
      </div>
      <div>
        <div className="row-item__title">{name}</div>
        <div className="row-item__amount">{balance} {currency.code}</div>
      </div>
      <div className={"row-item__amount delete-category"}>
        <DeleteIcon onClick={(event) => {
          event.stopPropagation();
          confirmDeletion();
          setAccountOnDeletionId(id);
        }} />
       
            
      </div>
    </div>
  );
};

export default StatsTransactionItem;
