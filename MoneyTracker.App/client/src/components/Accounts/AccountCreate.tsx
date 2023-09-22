import React, { useState } from 'react';
import InputWrapper from '../../elements/InputWrapper';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { CREATE_ACCOUNT } from '../../store/Account/Account.slice';
import Currencies from './Currencies.json';
import Dropdown from '../../elements/Dropdown';

interface Props {
  openPopupHandle(): void;
  name: string;
}

const AccountCreate: React.FC<Props> = ({ openPopupHandle, name }) => {
  const dispatch = useAppDispatch();
  const [accountName, setAccountName] = useState<string>(''); 
  const [selectedCurrency, setSelectedCurrency] = useState('UAH')
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value); 
  };
  const currencyOptions = Currencies.map((currencyCode, index) => ({
    value: currencyCode.code,
    label: currencyCode.code, 
  }));
  const handleSave = () => {
    console.log(accountName,selectedCurrency)
    dispatch({
      type: CREATE_ACCOUNT,
      payload: {
        accountName: accountName, 
        currencyCode: selectedCurrency, 
      }
    });
    openPopupHandle();
  };

  const handleCancel = () => {
    openPopupHandle();
  };

  return (
    <div className="popup-bg category-create">
      <div className="popup">
        <ul className="popup__header">
        
        </ul>
        <div className="popup__fields">
          <InputWrapper value={accountName}>
            <input
              type="text"
              placeholder="Name of account"
              value={accountName} 
              onChange={handleInputChange}
            />
          </InputWrapper>
          <Dropdown
      title={"Currency"}
      selectHandler={(option) => setSelectedCurrency(option.value)}
     
      options={currencyOptions}
    />

          <div className="popup__row popup__row__center">
          
          
          </div>

          
        </div>

        <div className="popup__row">
          <button onClick={handleSave} className="button">
            Save
          </button>
          <button onClick={handleCancel} className="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreate;

