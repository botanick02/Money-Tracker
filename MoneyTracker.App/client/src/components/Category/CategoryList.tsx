import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import CategoryCreate from "./CategoryCreate";
import {
  FETCH_CATEGORIES,
  deleteCategory,
} from "../../store/Category/Category.slice";
import { Category } from "../../types/Category";
import DeletePopup from "../DeletePopup";
import { TransactionTypes } from "../../store/FinancialOperation/FinancialOperation.slice";
import CategoryItem from "../../elements/CategoryItem";

const CategoryList = () => {
  const editSuccess = useAppSelector((state) => state.Category.editSuccess);

  const [categoryToEdit, setCategoryToEdit] = useState<undefined | Category>();
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const [categoryTypeFilter, setCategoryTypeFilter] =
    useState<TransactionTypes>(TransactionTypes.Expense);

  var categories = useAppSelector((state) => state.Category.categories)
    .filter((c) => c.isService == false)
    .filter((c) => c.isActive == true)
    .filter((c) => c.type === categoryTypeFilter)
    ;

  const [catOnDeletionId, setCatOnDeletionId] = useState<string | null>(null);

  const confirmDeletion = () => {
    if (catOnDeletionId) {
      dispatch(deleteCategory(catOnDeletionId));
    }
    setCatOnDeletionId(null);
  };

  const handlePopupOpen = () => {
    document.body.classList.toggle("no-scroll");
    setIsCreatePopupOpen((prevState) => {
      if (prevState) setCategoryToEdit(undefined);
      return !prevState;
    });
  };

  const handleCategoryItemClick = (item: Category) => {
    setCategoryToEdit(item);
    handlePopupOpen();
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FETCH_CATEGORIES());
  }, [editSuccess, dispatch]);

  const changeCategoryFilter = (
    type: TransactionTypes.Expense | TransactionTypes.Income
  ) => {
    setCategoryTypeFilter(type);
  };

  console.log(categoryTypeFilter);

  return (
    <main className={"category-settings-list"}>
      {catOnDeletionId && (
        <DeletePopup
          onDeleteApprove={confirmDeletion}
          closePopupHandle={() => setCatOnDeletionId(null)}
        />
      )}
      <div className={"transaction-sums"}>
        <div
          onClick={() => {
            changeCategoryFilter(TransactionTypes.Income);
          }}
          className={`transaction-sums__income ${
            categoryTypeFilter == TransactionTypes.Income && "active"
          }`}
        >
          Income
        </div>
        <div
          onClick={() => {
            changeCategoryFilter(TransactionTypes.Expense);
          }}
          className={`transaction-sums__expense ${
            categoryTypeFilter == TransactionTypes.Expense && "active"
          }`}
        >
          Expense
        </div>
      </div>
      {isCreatePopupOpen && (
        <CategoryCreate
          openPopupHandle={handlePopupOpen}
          categoryDefaultType={categoryTypeFilter}
          categoryToEdit={categoryToEdit}
        />
      )}
      {categories.map((item, index) => (
        <CategoryItem
          key={item.id}
          category={item}
          onDeleteClick={setCatOnDeletionId}
          onClick={() => {
            handleCategoryItemClick(item);
          }}
        />
      ))}
      {!isCreatePopupOpen && (
        <div onClick={handlePopupOpen} className="new-transaction button"></div>
      )}
    </main>
  );
};

export default CategoryList;
