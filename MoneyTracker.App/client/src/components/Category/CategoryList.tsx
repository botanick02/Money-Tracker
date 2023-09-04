import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import CategorySetsItemItem from "../../elements/CategoryItem";
import CategoryCreate from "./CategoryCreate";
import { FETCH_CATEGORIES } from "../../store/Category/Category.slice";
import { Category } from "../../types/Category";

const CategoryList = () => {
  const editSuccess = useAppSelector((state) => state.Category.editSuccess);

  const [categoryToEdit, setCategoryToEdit] = useState<undefined | Category>();
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<
    "expense" | "income"
  >("expense");

  var categories = useAppSelector((state) => state.Category.categories)
    .filter((c) => c.type !== "transfer")
    .filter((c) => c.isActive == true)
    .filter((c) => c.type === categoryTypeFilter);

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

  const changeCategoryFilter = (type: "expense" | "income") => {
    setCategoryTypeFilter(type);
  };

  return (
    <main className={"category-settings-list"}>
      <div className={"transaction-sums"}>
        <div
          onClick={() => {
            changeCategoryFilter("income");
          }}
          className={`transaction-sums__income ${
            categoryTypeFilter == "income" && "active"
          }`}
        >
          Income
        </div>
        <div
          onClick={() => {
            changeCategoryFilter("expense");
          }}
          className={`transaction-sums__expense ${
            categoryTypeFilter == "expense" && "active"
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
    </main>
  );
};

export default CategoryList;
