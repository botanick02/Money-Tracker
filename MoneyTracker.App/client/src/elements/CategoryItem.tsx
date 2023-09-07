import { FC } from "react";
import { Category } from "../types/Category";
import SvgFromPath from "./SvgFromPath";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { deleteCategory } from "../store/Category/Category.slice";
import { ReactComponent as DeleteIcon } from "../assets/icons/Delete-icon.svg";
import DeletePopup from "../components/DeletePopup";

interface CategoryItemProps {
  category: Category;
  onClick: () => void;
  onDeleteClick: (catId: string) => void;
}

const CategoryItem: FC<CategoryItemProps> = ({
  category,
  onClick,
  onDeleteClick,
}) => {
  return (
    <div className="row-item" onClick={onClick}>
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
          onDeleteClick(category.id);
        }}
        className={"row-item__amount delete-category"}
      >
        <DeleteIcon />
      </div>
    </div>
  );
};

export default CategoryItem;
