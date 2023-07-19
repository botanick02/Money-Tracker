import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../../types/ITransactionType";

export interface CreateTransactionState {
  loading: boolean;
  cancelLoading: boolean;
  error: null | string;
  transactions: Transaction[];
  countOfElements: number;
  incomes: number;
  expenses: number;
}

const initialState: CreateTransactionState = {
  error: null,
  cancelLoading: false,
  loading: false,
  transactions: [],
  countOfElements: 10,
  incomes: 0,
  expenses: 0,
};

export const TransactionItemsReducer = createSlice({
  name: "TransactionItems",
  initialState: initialState,
  reducers: {
    FETCH_TRANSACTIONS(
      state,
      action: PayloadAction<{ accountId?: string }>
    ) {
      state.loading = true;
      state.error = null;
      state.transactions = [];
      state.countOfElements = 0;
    },
    FETCH_TRANSACTIONS_SUCCESS(
      state,
      action: PayloadAction<{ transactions: Transaction[], incomes: number, expenses: number }>
    ) {
      state.loading = false;
      state.error = null;
      state.transactions = action.payload.transactions.slice().reverse();
      state.incomes = action.payload.incomes;
      state.expenses = action.payload.expenses;
    },
    FETCH_TRANSACTIONS_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.transactions = [];
    },
    ADD_DEBIT_OPERATION(
      state,
      action: PayloadAction<{
        amount: number;
        categoryId: any;
        title: string;
        accountId: string;
      }>
    ) {
      state.loading = true;
      state.error = null;
    },
    ADD_CREDIT_OPERATION(
      state,
      action: PayloadAction<{
        amount: number;
        categoryId: any;
        title: string;
        accountId: string;
      }>
    ) {
      state.loading = true;
      state.error = null;
    },
    ADD_TRANSFER_OPERATION(
      state,
      action: PayloadAction<{
        amount: number;
        categoryId: any;
        title: string;
        fromAccountId: string;
        toAccountId: string;
      }>
    ) {
      state.loading = true;
      state.error = null;
    },
    ADD_FINANCIAL_OPERATION_SUCCESS(
      state,
      action: PayloadAction<{ addTransactionSuccess: boolean }>
    ) {
      state.loading = false;
      state.error = null;
    },
    ADD_FINANCIAL_OPERATION_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    CANCEL_FINANCIAL_OPERATION(
      state,
      action: PayloadAction<{ transactionId: string }>
    ) {
      state.loading = true;
      state.error = null;
    },
    CANCEL_FINANCIAL_OPERATION_SUCCESS(
      state,
      action: PayloadAction<{ cancelTransactionSuccess: boolean }>
    ) {
      state.loading = false;
      state.error = null;
    },
    CANCEL_FINANCIAL_OPERATION_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default TransactionItemsReducer.reducer;
