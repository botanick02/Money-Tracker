import React, { FC } from 'react';
import { DELETE_ACCOUNT } from '../store/Account/Account.slice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { ReactComponent as DeleteIcon } from "../assets/icons/Delete-icon.svg";

interface StatsTransactionItemProps {
  id: string;
  name: string;
  currency: string;
  balance: number;
}

const StatsTransactionItem: FC<StatsTransactionItemProps> = ({ id, name, currency, balance }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    console.log(id)
    dispatch(DELETE_ACCOUNT({ accountID: id}));

  };

  return (
<div className="row-item">
  <div className="row-item__indicator row-item__indicator__currency" />
  <div className="row-item__category-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    {currency}
  </div>
  <div>
    <div className="row-item__title">{name}</div>
    <div className="row-item__amount" >  {balance}</div>
  </div>

  <div
       
       className={"row-item__amount delete-category"}
     >
       <DeleteIcon onClick={(event) => {
    event.stopPropagation();
    handleClick(); 
  }}/>
     </div>

</div>


  
  );
};

export default StatsTransactionItem;
