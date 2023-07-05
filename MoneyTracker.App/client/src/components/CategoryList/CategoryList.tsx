import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import CategorySetsItemItem from "../../elements/CategorySetsItemItem";
import { CategoryItemReducer } from "../../store/Example/Reducers/CategoryItemsReducer";
import CategoryCreate from "../CategoryCreate/CategoryCreate";

const CategoryList = () => {
  const items = useAppSelector((state) => state.Category.categories);
  const { FETCH_CATEGORIES,EDIT_CATEGORY } = CategoryItemReducer.actions;
  const editSuccess = useAppSelector((state) => state.Category.editSuccess)
  const [defaultTransaction, setDefaultTransaction] = useState<
    "expense" | "income"
  >("expense");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  const handleCategoryItemClick = (item: any) => {
    setDefaultTransaction(item.type.toLowerCase());
    setName(item.name);
    setId(item.id);
  };

  const dispatch = useAppDispatch();

  const page = 1;
  const countOfElements = 5;
  useEffect(() => {
    console.log(name, id);
  }, [name, id]);
  useEffect(() => {
    dispatch(FETCH_CATEGORIES({ page, countOfElements }));
  }, [page, countOfElements,editSuccess]);

  return (
    <div className="transaction-list">
      {isCreatePopupOpen && (
        <CategoryCreate
          transactionDefaultType={defaultTransaction}
          openPopupHandle={handlePopupOpen}
          name={name}
        id={id}
         
        />
      )}
      {items.map((item, index) => (
        <CategorySetsItemItem
          key={index}
          category={item}
          onClick={() => {
            console.log(item)
            handleCategoryItemClick(item);
            handlePopupOpen();
           
          }}
        />
      ))}

      {!isCreatePopupOpen && (
        <div onClick={handlePopupOpen} className="new-transaction button">
          +
        </div>
      )}
    </div>
  );
};

export default CategoryList;
