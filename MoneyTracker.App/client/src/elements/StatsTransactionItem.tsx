import React, { FC } from 'react';

interface StatsTransactionItemProps {
  id: string;
  name: string;
  currency: string;
  balance: number;
}

const StatsTransactionItem: FC<StatsTransactionItemProps> = ({ id, name, currency, balance }) => {
  const amountClassName = balance >= 0 ? 'row-item__amount row-item__amount__income' : 'row-item__amount row-item__amount__expense';

  return (

 
  
<div className="row-item">
  <div className="row-item__indicator row-item__indicator__currency" />
  <div className="row-item__category-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    {currency}
  </div>
  <div>
    <div className="row-item__title">{name}</div>
  </div>
  <div className={amountClassName}>{balance}</div>
</div>

  );
};

export default StatsTransactionItem;
