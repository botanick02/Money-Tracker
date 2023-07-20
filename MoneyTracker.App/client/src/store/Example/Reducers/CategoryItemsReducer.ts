import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../../types/Category";

export interface CreateCategoryState {
  loading: boolean;
  error: null | string;
  categories: Category[];
  countOfElements: number;
  editSuccess:boolean
}

const initialState: CreateCategoryState = {
  error: null,
  loading: false,
  categories: [],
  countOfElements: 10,
  editSuccess: false,
  };


export const CategoryItemReducer = createSlice({
  name: "CategoryItems",
  initialState: initialState,
  reducers: {
    FETCH_CATEGORIES(
      state
    ){
      state.loading = true;
      state.error = null;
    },
    FETCH_CATEGORIES_SUCCESS(
      state,
      action: PayloadAction<{ categories: Category[];}>
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
      state.editSuccess = false
      state.loading = true;
      state.error = null;
    },
    EDIT_CATEGORY_SUCCESS(
      state,
      action: PayloadAction<{ editSuccess: boolean;}>
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

export default CategoryItemReducer.reducer;
