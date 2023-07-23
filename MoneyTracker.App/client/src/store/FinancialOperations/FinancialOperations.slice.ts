import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../types/Transaction";

interface Operation {
  amount: number;
  categoryId: any;
  title: string;
}

interface DebitCreditOperation extends Operation {
  accountId: string;
}

interface TransferOperation extends Operation {
  fromAccountId: string;
  toAccountId: string;
}

interface FetchTransactionsInfo{
  transactions: Transaction[];
  incomes: number;
  expenses: number;
}

export interface CreateTransactionState {
  loading: boolean;
  cancelLoading: boolean;
  error: string | null;
  transactions: Transaction[];
  countOfElements: number;
  incomes: number;
  expenses: number;
}

const initialState: CreateTransactionState = {
  cancelLoading: false,
  loading: false,
  transactions: [],
  countOfElements: 10,
  incomes: 0,
  expenses: 0,
  error: null,
};

export const FinancialOperationsSlice = createSlice({
  name: "FinancialOperations",
  initialState: initialState,
  reducers: {
    FETCH_TRANSACTIONS_INFO(state, action: PayloadAction<{ accountId?: string }>) {
      state.loading = true;
      state.error = null;
      state.transactions = [];
      state.countOfElements = 0;
    },
    FETCH_TRANSACTIONS_INFO_SUCCESS(
      state,
      action: PayloadAction<FetchTransactionsInfo>
    ) {
      state.loading = false;
      state.error = null;
      state.transactions = action.payload.transactions.slice().reverse();
      state.incomes = action.payload.incomes;
      state.expenses = action.payload.expenses;
    },
    FETCH_TRANSACTIONS_INFO_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.transactions = [];
    },
    ADD_DEBIT_OPERATION(state, action: PayloadAction<DebitCreditOperation>) {
      state.loading = true;
      state.error = null;
    },
    ADD_CREDIT_OPERATION(state, action: PayloadAction<DebitCreditOperation>) {
      state.loading = true;
      state.error = null;
    },
    ADD_TRANSFER_OPERATION(state, action: PayloadAction<TransferOperation>) {
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

export const {
  FETCH_TRANSACTIONS_INFO,
  FETCH_TRANSACTIONS_INFO_ERROR,
  FETCH_TRANSACTIONS_INFO_SUCCESS,
  ADD_CREDIT_OPERATION,
  ADD_DEBIT_OPERATION,
  ADD_TRANSFER_OPERATION,
  ADD_FINANCIAL_OPERATION_ERROR,
  ADD_FINANCIAL_OPERATION_SUCCESS,
  CANCEL_FINANCIAL_OPERATION,
    CANCEL_FINANCIAL_OPERATION_ERROR,
    CANCEL_FINANCIAL_OPERATION_SUCCESS
} = FinancialOperationsSlice.actions;

export default FinancialOperationsSlice.reducer;
