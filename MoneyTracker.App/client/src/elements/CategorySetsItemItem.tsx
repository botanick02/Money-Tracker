import React, { FC } from 'react';
import { ICategoryType } from '../types/ICategoryType';

interface CategorySetsItemProps {
  category: ICategoryType;
  onClick: () => void;
}

const CategorySetsItem: FC<CategorySetsItemProps> = ({ category, onClick }) => {
  return (
    <div className="row-item" onClick={onClick}>
      <div className={`row-item__indicator row-item__indicator__${category.type.toLowerCase()}`} />
      <div className="row-item__category-icon">
        <img src="https://picsum.photos/50" alt="category" />
      </div>
      <div>
        <div className="row-item__title">{category.name}</div>
        <div className="row-item__sub-title">{category.id}</div>
      </div>
    </div>
  );
};

export default CategorySetsItem;
