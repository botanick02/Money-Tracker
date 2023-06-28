import React, { FC } from 'react';

import { Transaction } from '../types/Transaction';

const CategoryItem: FC<{ transaction: Transaction, percentage: number, color: string }> = ({ transaction, percentage, color }) => {
  return (
    <div className="category">
      <div className={`category__indicator `} style={{ backgroundColor: color }} />
      <div className="category__category-icon">
        <img src={transaction.category.iconUrl} alt="category" />
      </div>
      <div>
        <div className="category__title">{transaction.category.name}{transaction.category.percentage}</div>
      </div>
      <div className="category__amount">{transaction.amount} $ {percentage}</div>
    </div>
  );
};

export default CategoryItem;
