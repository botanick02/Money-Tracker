import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category, CategoryToCreate, CategoryToUpdate} from "../../types/Category";

export interface CreateCategoryState {
  loading: boolean;
  error: null | string;
  categories: Category[];
  editSuccess: boolean;
}

const initialState: CreateCategoryState = {
  error: null,
  loading: false,
  categories: [],
  editSuccess: false,
};

export const CategorySlice = createSlice({
  name: "Categories",
  initialState: initialState,
  reducers: {
    FETCH_CATEGORIES(state) {
      state.loading = true;
      state.error = null;
    },
    FETCH_CATEGORIES_SUCCESS(
      state,
      action: PayloadAction<{ categories: Category[] }>
    ) {
      state.loading = false;
      state.error = null;
      state.categories = action.payload.categories;
    },
    FETCH_CATEGORIES_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    EDIT_CATEGORY(
      state,
      action: PayloadAction<{ categoryId: string; name: string }>
    ) {
      state.editSuccess = false;
      state.loading = true;
      state.error = null;
    },
    EDIT_CATEGORY_SUCCESS(
      state,
      action: PayloadAction<{ editSuccess: boolean }>
    ) {
      state.loading = false;
      state.error = null;
      state.editSuccess = action.payload.editSuccess;
    },
    EDIT_CATEGORY_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
  EDIT_CATEGORY,
  EDIT_CATEGORY_ERROR,
  EDIT_CATEGORY_SUCCESS,
} = CategorySlice.actions;

export const createCategory = createAction<CategoryToCreate>("createCategory")
export const editCategory = createAction<CategoryToUpdate>("editCategory")
export const deleteCategory = createAction<string>("deleteCategory")

export default CategorySlice.reducer;
