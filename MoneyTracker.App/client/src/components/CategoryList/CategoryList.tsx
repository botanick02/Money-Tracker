import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import CategorySetsItemItem from "../../elements/CategorySetsItemItem";
import CategoryCreate from "../CategoryCreate/CategoryCreate";
import TimeScopePanel from "../TimeScopePanel/TimeScopePanel";
import {FETCH_CATEGORIES} from "../../store/Category/Category.slice";

const CategoryList = () => {
  const items = useAppSelector((state) => state.Category.categories);
  const editSuccess = useAppSelector((state) => state.Category.editSuccess);

  const [defaultTransaction, setDefaultTransaction] = useState<"expense" | "income">("expense");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => !prevState);
  };

  const handleCategoryItemClick = (item: any) => {
    setDefaultTransaction(item.type.toLowerCase());
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
          />
        )}
        {items.map((item, index) => (
          <CategorySetsItemItem
            key={index}
            category={item}
            onClick={() => {
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
    </main>
  );
};

export default CategoryList;
