import React, { useState } from 'react';
import InputWrapper from '../../elements/InputWrapper';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { CREATE_ACCOUNT } from '../../store/Account/Account.slice';

interface Props {
  openPopupHandle(): void;
  name: string;
}

const AccountCreate: React.FC<Props> = ({ openPopupHandle, name }) => {
  const dispatch = useAppDispatch();
  const [accountName, setAccountName] = useState<string>(''); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value); 
  };

  const handleSave = () => {
    dispatch(CREATE_ACCOUNT(accountName)); 
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
          <InputWrapper>
            <input
              type="text"
              placeholder="Name of account"
              value={accountName} // Use the state variable here
              onChange={handleInputChange}
            />
          </InputWrapper>

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

