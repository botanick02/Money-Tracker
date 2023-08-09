import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import CategorySetsItemItem from "../../elements/CategorySetsItemItem";
import CategoryCreate from "../CategoryCreate/CategoryCreate";
import TimeScopePanel from "../TimeScopePanel/TimeScopePanel";
import {FETCH_CATEGORIES} from "../../store/Category/Category.slice";
import {Category} from "../../types/Category";

const CategoryList = () => {
  const {categories} = useAppSelector((state) => state.Category);
  const editSuccess = useAppSelector((state) => state.Category.editSuccess);

  const [defaultTransaction, setDefaultTransaction] = useState<"expense" | "income">("expense");
  const [categoryToEdit, setCategoryToEdit] = useState<undefined | Category>()
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => {
      if (prevState)
        setCategoryToEdit(undefined)
      return !prevState
    });
  };

  const handleCategoryItemClick = (item: Category) => {
    setDefaultTransaction(item.type);
    setCategoryToEdit(item)
    handlePopupOpen();
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FETCH_CATEGORIES());
  }, [editSuccess, dispatch]);

  return (
    <main>
      <div className="transaction-list">
        {isCreatePopupOpen && (
          <CategoryCreate
            transactionDefaultType={defaultTransaction}
            openPopupHandle={handlePopupOpen}
            categoryToEdit={categoryToEdit}
          />
        )}
        {categories.map((item, index) => (
          <CategorySetsItemItem
            key={item.id}
            category={item}
            onClick={() => {
              handleCategoryItemClick(item);
            }}
          />
        ))}

        {!isCreatePopupOpen && (
          <div onClick={handlePopupOpen} className="new-transaction button">
            +
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryList;
