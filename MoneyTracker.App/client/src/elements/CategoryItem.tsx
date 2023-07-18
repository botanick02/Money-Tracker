import React, { FC } from 'react';
import { ICategoryType } from '../types/ICategoryType';

interface CategoryItemProps {
  category: {
    amount: number;
    category: ICategoryType;
    color: string;
  };
  percentage: number;
  color: string;
}

const CategoryItem: FC<CategoryItemProps> = ({ category, percentage, color }) => {
  const { amount, category: categoryType } = category;

  return (
    <div className="category">
      <div className={`category__indicator`} style={{ backgroundColor: color }} />

      <div>
        <div className="category__title">{categoryType.name}</div>
      </div>
      <div className="category__amount">
        {amount} $ | {percentage} %
      </div>
    </div>
  );
};

export default CategoryItem;
