import React, { FC } from 'react';
import { Category } from '../types/Category';
import SvgFromPath from "./SvgFromPath";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {deleteCategory} from "../store/Category/Category.slice";

interface CategorySetsItemProps {
  category: Category;
  onClick: () => void;
}

const CategorySetsItem: FC<CategorySetsItemProps> = ({ category, onClick }) => {

  const dispatch = useAppDispatch()
  const handleDelete = () => {
    dispatch(deleteCategory(category.id))
  }

  return (
    <div className="row-item" onClick={onClick}>
      <div className={`row-item__indicator row-item__indicator__${category.type.toLowerCase()}`} />
      <div style={{background: category.color}} className="row-item__category-icon">
        <SvgFromPath path={category.iconUrl} styles={{background: category.color}}/>
      </div>
      <div>
        <div className="row-item__title">{category.name}</div>
        <div className="row-item__sub-title">{category.id}</div>
      </div>
      <div onClick={handleDelete} style={{background: "red", width: 25, height: 25}} className={"row-item__amount"}>
        X
      </div>
    </div>
  );
};

export default CategorySetsItem;
