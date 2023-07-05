import React, { useEffect, useState } from 'react';
import InputWrapper from "../../elements/InputWrapper";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { CategoryItemReducer } from '../../store/Example/Reducers/CategoryItemsReducer';

interface Props {
  openPopupHandle(): void;
  transactionDefaultType: string;
  name: string;
id: string;
}

const CategoryCreate: React.FC<Props> = ({
  openPopupHandle,
  transactionDefaultType,
  name,
  id
  
}) => {
  const [type, setType] = useState(transactionDefaultType);

  const colorOptions: Option[] = [
    {
      label: "Blue",
      value: 0
    },
    {
      label: "Red",
      value: 1
    },
    {
      label: "Green",
      value: 2
    },
    {
      label: "Purple",
      value: 3
    }
  ];

  const imageOptions: any[] = [
    {
      icon: "https://picsum.photos/50",
      value: 0
    },
    {
      icon: "https://picsum.photos/51",
      value: 1
    },
    {
      icon: "https://picsum.photos/52",
      value: 2
    },
    {
      icon: "https://picsum.photos/53",
      value: 3
    }
  ];

  const [color, setColor] = useState<Option>(colorOptions[0]);
  const handleColorChange = (option: Option) => {
    setColor(option);
  };
  const { EDIT_CATEGORY } = CategoryItemReducer.actions;

  const [image, setImage] = useState<Option>(imageOptions[0]);
  const handleImageChange = (option: Option) => {
    setImage(option);
  };

  const handleCancel = () => {
    openPopupHandle();
  };
  const dispatch = useAppDispatch();
  const handleSave = () => {
    dispatch({
      type: EDIT_CATEGORY,
      payload: {
        categoryId: id, 
        name: inputValue 
      }
    });
    openPopupHandle();
  };
  const [inputValue, setInputValue] = useState(name);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  
  return (
    <div className="transaction-create-bg">
      <div className="transaction-create">
        <ul className="transaction-create__type">
          <li
            onClick={() => {
              setType("income");
            }}
            className={type === "income" ? "current-type" : ""}
          >
            Income
          </li>
          <li
            onClick={() => {
              setType("expense");
            }}
            className={type === "expense" ? "current-type" : ""}
          >
            Expense
          </li>
        </ul>
        <div className="transaction-create__fields">
          <InputWrapper>
            <input type="text" placeholder="Name of category" value={inputValue} 
            onChange={handleInputChange}
            />
          </InputWrapper>
          <Dropdown
            title="Image"
            selectHandler={handleImageChange}
            options={imageOptions}
          />
          <Dropdown
            title="Color"
            selectHandler={handleColorChange}
            options={colorOptions}
          />
        </div>
        <div className="transaction-create__row">
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
