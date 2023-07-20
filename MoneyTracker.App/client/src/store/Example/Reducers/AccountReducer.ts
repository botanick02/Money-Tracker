import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../../types/Account";

export interface AccountStore {
  accounts: Account[];
  currentAccountId: string;
  loading: boolean;
  error?: string;
}

const initialState: AccountStore = {
  accounts: [],
  currentAccountId: "total",
  loading: false,
};

export const AccountReducer = createSlice({
  name: "Account",
  initialState: initialState,
  reducers: {
    FETCH_ACCOUNTS(state) {
      state.loading = true;
    },
    FETCH_ACCOUNTS_SUCCESS(
      state,
      action: PayloadAction<{ accounts: Account[]; total: number }>
    ) {
      state.accounts = action.payload.accounts;

      let totalAcount: Account = {
        id:  "total",
        name: "Total",
        balance: action.payload.total,
        currency: {code: "UAH", symbol: "₴"}
      }

      state.accounts.push(totalAcount);
      
      state.loading = false;
    },
    FETCH_ACCOUNTS_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    SET_CURRENT_ACCOUNT_ID(state, action: PayloadAction<string>) {
      state.currentAccountId = action.payload;
    },
  },
});

export const {
  FETCH_ACCOUNTS, FETCH_ACCOUNTS_ERROR, FETCH_ACCOUNTS_SUCCESS, SET_CURRENT_ACCOUNT_ID
} = AccountReducer.actions;

export default AccountReducer.reducer;
