import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../hooks/useAppDispatch";
import { Account } from "../../../types/Account";

export interface AccountStore {
  accounts: Account[];
  total: number;
  loading: boolean;
  error: null | string;
}

const initialState: AccountStore = {
  accounts: [],
  total: 0,
  loading: false,
  error: null,
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
      state.total = action.payload.total;
      state.loading = false;
    },
    FETCH_ACCOUNTS_FAIL(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {} = AccountReducer.actions;

export default AccountReducer.reducer;
