import React, { useState } from "react";
import InputWrapper from "../../elements/InputWrapper";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  createCategory,
  editCategory,
} from "../../store/Category/Category.slice";
import categoryIcons from "./categoryIconsPath.json";
import SvgFromPath from "../../elements/SvgFromPath";
import {
  Category,
  CategoryToCreate,
  CategoryToUpdate,
} from "../../types/Category";
import { TransactionTypes } from "../../store/FinancialOperation/FinancialOperation.slice";

interface Props {
  openPopupHandle(): void;
  categoryDefaultType?: TransactionTypes
  categoryToEdit?: Category;
}

const defaultBackground = "#02dbff";

const CategoryCreate: React.FC<Props> = ({
  openPopupHandle,
  categoryDefaultType,
  categoryToEdit,
}) => {
  const [category, setCategory] = useState<CategoryToCreate | Category>(
    categoryToEdit ?? {
      color: defaultBackground,
      iconUrl: "",
      name: "",
      type: categoryDefaultType?? TransactionTypes.Expense,
    }
  );
  const dispatch = useAppDispatch();

  const handleTypeChange = (type: TransactionTypes.Income | TransactionTypes.Expense) => {
    setCategory({ ...category, type });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: event.target.value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, color: e.target.value });
  };

  const handleIconChange = (path: string) => {
    setCategory({ ...category, iconUrl: path });
  };

  const handleSave = () => {
    if (!!categoryToEdit) {
      const catToUpdate: CategoryToUpdate = {
        id: categoryToEdit.id,
        name: category.name,
        color: category.color,
        iconUrl: category.iconUrl,
        type: category.type
      }
      dispatch(editCategory(catToUpdate));
    } else {
      dispatch(createCategory(category));
    }

    openPopupHandle();
  };

  const handleCancel = () => {
    openPopupHandle();
  };

  return (
    <div className="popup-bg category-create">
      <div className="popup">
        <ul className="popup__header">
          <li
            onClick={() => {
              handleTypeChange(TransactionTypes.Income);
            }}
            className={category.type === TransactionTypes.Income ? "current-type" : ""}
          >
            Income
          </li>
          <li
            onClick={() => {
              handleTypeChange(TransactionTypes.Expense);
            }}
            className={category.type === TransactionTypes.Expense ? "current-type" : ""}
          >
            Expense
          </li>
        </ul>
        <div className="popup__fields">
          <InputWrapper>
            <input
              type="text"
              placeholder="Name of category"
              value={category.name}
              onChange={handleInputChange}
            />
          </InputWrapper>

          <div className="popup__row popup__row__center">
            <label htmlFor="color-change">Icon Background</label>
            <input
              value={category.color}
              onChange={handleColorChange}
              id="color-change"
              type="color"
            />
          </div>

          <div className={"icon-area"}>
            {categoryIcons.map((item) => (
              <div key={item} onClick={() => handleIconChange(item)}>
                <SvgFromPath
                  isActive={item === category.iconUrl}
                  styles={{ background: category.color }}
                  path={item}
                />
              </div>
            ))}
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

export default CategoryCreate;
