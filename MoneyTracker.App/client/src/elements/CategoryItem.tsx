import React, { FC, useState } from "react";
import { Category } from "../types/Category";
import SvgFromPath from "./SvgFromPath";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { deleteCategory } from "../store/Category/Category.slice";
import { ReactComponent as DeleteIcon } from "../assets/icons/Delete-icon.svg";
import DeletePopup from "../components/DeletePopup";

interface CategoryItemProps {
  category: Category;
  onClick: () => void;
}

const CategoryItem: FC<CategoryItemProps> = ({ category, onClick }) => {
  const dispatch = useAppDispatch();

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const confirmDeletion = () => {
      dispatch(deleteCategory(category.id));
  };

  return (
    <div className="row-item" onClick={onClick}>
      {isDeletePopupOpen && (
        <DeletePopup
          onDeleteApprove={confirmDeletion}
          closePopupHandle={() => setIsDeletePopupOpen(false)}
        />
      )}
      <div
        className={`row-item__indicator row-item__indicator__${category.type.toLowerCase()}`}
      />
      <div
        style={{ background: category.color }}
        className="row-item__category-icon"
      >
        <SvgFromPath
          path={category.iconUrl}
          styles={{ background: category.color }}
        />
      </div>
      <div>
        <div className="row-item__title">{category.name}</div>
      </div>
      <div
        onClick={(event) => {
          event.stopPropagation();
          setIsDeletePopupOpen(true);
        }}
        className={"row-item__amount delete-category"}
      >
        <DeleteIcon />
      </div>
    </div>
  );
};

export default CategoryItem;
