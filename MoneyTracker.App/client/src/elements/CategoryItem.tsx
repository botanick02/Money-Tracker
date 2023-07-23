import React, { FC } from 'react';
import { Category } from '../types/Category';

interface CategoryItemProps {
  category: {
    amount: number;
    category: Category;
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
