import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionType } from "../../../types/ITransactionType";

export interface CreateTransactionState {
  loading: boolean;
  error: null | string;
  transactions: ITransactionType[];
  countOfElements: number;
  editSuccess: boolean;
}

const initialState: CreateTransactionState = {
  error: null,
  loading: false,
  transactions: [],
  countOfElements: 10,
  editSuccess: false
};

export const TransactionItemsReducer = createSlice({
  name: "TransactionItems",
  initialState: initialState,
  reducers: {
    FETCH_TRANSACTIONS(
      state,
      action: PayloadAction<{ dateTimeTo: string | null }>
    ) {
      state.loading = true;
      state.error = null;
      state.transactions = [];
      state.countOfElements = 0;
      console.log(action.payload);
    },
    FETCH_TRANSACTIONS_SUCCESS(
      state,
      action: PayloadAction<{ transactions: ITransactionType[] }>
    ) {
      state.loading = false;
      state.error = null;
      state.transactions = action.payload.transactions;
    },
    FETCH_TRANSACTIONS_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.transactions = [];
    }
  },
});

export default TransactionItemsReducer.reducer;