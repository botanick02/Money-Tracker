import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryType } from "../../../types/ICategoryType";



export interface CreateCategoryState {
  loading: boolean;
  error: null | string;
  categories: ICategoryType[];
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
      state,
      action: PayloadAction<{
        page?: number;
        countOfElements?: number;
        dateTimeTo: string | null;
      }>
    ){
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
