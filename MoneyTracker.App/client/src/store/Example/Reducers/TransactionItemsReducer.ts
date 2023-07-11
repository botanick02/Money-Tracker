import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionType } from "../../../types/ITransactionType";

export interface CreateTransactionState {
  loading: boolean;
  cancelLoading: boolean;
  error: null | string;
  transactions: ITransactionType[];
  countOfElements: number;
  addTransactionSuccess: boolean;
  cancelTransactionSuccess: boolean;
}

const initialState: CreateTransactionState = {
  error: null,
  cancelLoading: false,
  loading: false,
  transactions: [],
  countOfElements: 10,
  addTransactionSuccess: false,
  cancelTransactionSuccess: false
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
    },
    FETCH_TRANSACTIONS_SUCCESS(
      state,
      action: PayloadAction<{ transactions: ITransactionType[] }>
    ) {
      state.loading = false;
      state.error = null;
      state.transactions = action.payload.transactions.slice().reverse();

      
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
    CANCEL_TRANSACTION(
      state,
      action: PayloadAction<{ transactionId:string;}>
    ) {
      state.cancelTransactionSuccess = false
      state.loading = true;
      state.cancelLoading = true;
      state.error = null;
    },
    CANCEL_TRANSACTION_SUCCESS(
      state,
      action: PayloadAction<{ cancelTransactionSuccess: boolean;}>
    ) {
      state.loading = false;
      state.error = null;
      state.cancelLoading = false;
      state.cancelTransactionSuccess = action.payload.cancelTransactionSuccess;
      
     
    },
    CANCEL_TRANSACTION_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default TransactionItemsReducer.reducer;

