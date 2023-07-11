import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionType } from "../../../types/ITransactionType";

export interface CreateTransactionState {
  loading: boolean;
  error: null | string;
  transactions: ITransactionType[];
  countOfElements: number;
  addTransactionSuccess: boolean;
}

const initialState: CreateTransactionState = {
  error: null,
  loading: false,
  transactions: [],
  countOfElements: 10,
  addTransactionSuccess: false
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
    },
    ADD_TRANSACTION(
      state,
      action: PayloadAction<{ amount: number; categoryId: any;   title: string; fromAccountId:string; toAccountId:string; }>
    ) {
      state.addTransactionSuccess = false
      state.loading = true;
      state.error = null;
    },
    ADD_TRANSACTION_SUCCESS(
      state,
      action: PayloadAction<{ addTransactionSuccess: boolean;}>
    ) {
      state.loading = false;
      state.error = null;
      state.addTransactionSuccess = action.payload.addTransactionSuccess;
     
    },
    ADD_TRANSACTION_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default TransactionItemsReducer.reducer;