import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryType } from "../../../types/ICategoryType";


export interface CreateCategoryState {
  loading: boolean;
  error: null | string;
  categories: ICategoryType[];
  countOfElements: number;
}

const initialState: CreateCategoryState = {
  error: null,
  loading: false,
  categories: [],
  countOfElements: 10,
};

export const CategoryItemReducer = createSlice({
  name: "CategoryItems",
  initialState: initialState,
  reducers: {
    FETCH_CATEGORIES(
      state,
      action: PayloadAction<{ page: number; countOfElements: number }>
    ) {
      state.loading = true;
      state.error = null;
      state.categories = [];
      state.countOfElements = 0;
    },
    FETCH_CATEGORIES_SUCCESS(
      state,
      action: PayloadAction<{ categories: ICategoryType[];}>
    ) {
      state.loading = false;
      state.error = null;
      state.categories = action.payload.categories;
     
    },
    FETCH_CATEGORIES_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.categories = [];
    },
  },
});

export default CategoryItemReducer.reducer;
