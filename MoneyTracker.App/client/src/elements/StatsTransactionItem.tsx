import React, { FC, useState, useEffect } from 'react';
import { DELETE_ACCOUNT } from '../store/Account/Account.slice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { ReactComponent as DeleteIcon } from "../assets/icons/Delete-icon.svg";
import { Currency } from '../types/Currency';
import DeleteAccountPopup from '../components/DeleteAccountPopup';

async function fetchFlagUrl(currencyCode: string) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0 && data[0].flags && data[0].flags.svg) {
      return data[0].flags.svg;
    } else {
      return "";
    }
  } catch (error) {
    console.error('Flags error:', error);
    return "";
  }
}

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

  useEffect(() => {
    const fetchIcon = async () => {
      const iconUrl = await fetchFlagUrl(currency.code);
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
    console.log(selectedPopupOption);
    if (accountOnDeletionId) {
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
