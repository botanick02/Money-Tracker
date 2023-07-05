import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import CategorySetsItemItem from '../../elements/CategorySetsItemItem';
import { CategoryItemReducer } from '../../store/Example/Reducers/CategoryItemsReducer';
import CategoryCreate from '../CategoryCreate/CategoryCreate';

const CategoryList = () => {
  const items = useAppSelector((state) => state.Category.categories);
  const { FETCH_CATEGORIES } = CategoryItemReducer.actions;

  const [defaultTransaction, setDefaultTransaction] = useState<
  "expense" | "income"
>("expense");

const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
const handlePopupOpen = () => {
  document.body.classList.toggle("no-scroll");
  setIsCreatePopupOpen((prevState) => !prevState);
};


  const dispatch = useAppDispatch();

  const page = 1;
  const countOfElements = 5;

  useEffect(() => {
    dispatch(FETCH_CATEGORIES({ page, countOfElements }));
  }, [dispatch, page, countOfElements]);


  return (
    <div className="transaction-list">
      {isCreatePopupOpen && (
        <CategoryCreate
          transactionDefaultType={defaultTransaction}
          openPopupHandle={handlePopupOpen}
        />
      )}
      {items.map((item, index) => (
        <CategorySetsItemItem key={item.id} category={item} />
      ))}
      {!isCreatePopupOpen && (
        <div
          onClick={handlePopupOpen}
          className="new-transaction button"
        >
          +
        </div>
      )}
    </div>
  );
};

export default CategoryList;
