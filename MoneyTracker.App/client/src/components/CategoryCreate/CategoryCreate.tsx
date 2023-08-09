import React, {useEffect, useState} from 'react';
import InputWrapper from "../../elements/InputWrapper";
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {createCategory, EDIT_CATEGORY} from '../../store/Category/Category.slice';
import categoryIcons from './categoryIconsPath.json'
import SvgFromPath from "../../elements/SvgFromPath";
import {Category, CategoryToCreate} from "../../types/Category";

interface Props {
  openPopupHandle(): void;
  transactionDefaultType: "income" | "expense";
}

const defaultBackground = "#02dbff"


const CategoryCreate: React.FC<Props> = ({
                                           openPopupHandle,
                                           transactionDefaultType
                                         }) => {
  const [category, setCategory] = useState<CategoryToCreate>({
    color: defaultBackground,
    iconUrl: "",
    name: "",
    type: transactionDefaultType
  })
  const dispatch = useAppDispatch();

  const handleTypeChange = (type: "income" | "expense") => {
    setCategory({...category, type})
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({...category, name: event.target.value});
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({...category, color: e.target.value})
  }

  const handleIconChange = (path: string) => {
    setCategory({...category, iconUrl: path})
  }

  const handleSave = () => {
    dispatch(createCategory(category));
    openPopupHandle();
  };

  const handleCancel = () => {
    openPopupHandle();
  };

  console.log(category)
  return (
    <div className="popup-bg category-create">
      <div className="popup">
        <ul className="popup__header">
          <li
            onClick={() => {
              handleTypeChange("income");
            }}
            className={category.type === "income" ? "current-type" : ""}
          >
            Income
          </li>
          <li
            onClick={() => {
              handleTypeChange("expense");
            }}
            className={category.type === "expense" ? "current-type" : ""}
          >
            Expense
          </li>
        </ul>
        <div className="popup__fields">
          <InputWrapper>
            <input type="text" placeholder="Name of category" value={category.name}
                   onChange={handleInputChange}
            />
          </InputWrapper>

          <div className="popup__row popup__row__center">
            <label htmlFor="color-change">Icon Background</label>
            <input value={category.color} onChange={handleColorChange} id="color-change" type="color"/>
          </div>

          <div className={'icon-area'}>
            {
              categoryIcons.map(item => <div key={item} onClick={() => handleIconChange(item)}>
                <SvgFromPath styles={{background: category.color}} path={item}/>
              </div>)
            }
          </div>
        </div>


        <div className="popup__row">
          <button
            onClick={() => {
              handleSave();
            }}
            className="button"
          >
            Save
          </button>
          <button
            onClick={() => {
              handleCancel();
            }}
            className="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
