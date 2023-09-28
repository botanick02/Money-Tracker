import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../types/Transaction";

export interface ImportDataState {
  loading: boolean;
}

const initialState: ImportDataState = {
  loading: false,
};

export const ImportDataSlice = createSlice({
  name: "ImportData",
  initialState: initialState,
  reducers: {
    UPLOAD_FILE(state) {
      state.loading = true;
    },
    UPLOAD_FILE_SUCCESS(
      state
    ) {
      state.loading = false;
    },
    UPLOAD_FILE_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
    },
  },
});

export const {
 
} = ImportDataSlice.actions;

export default ImportDataSlice.reducer;
