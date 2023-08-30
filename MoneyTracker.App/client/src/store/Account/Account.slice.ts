import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../types/Account";

export interface AccountState {
  accounts: Account[];
  currentAccountId: string | null;
  loading: boolean;
  error: string | null;
  currentCategoryId: string | null;
  currentCategoryName: string | null;
  currentCategoryColor: string | null;
}

const initialState: AccountState = {
  accounts: [],
  currentAccountId: "total",
  loading: false,
  error: null,
  currentCategoryId: null,
  currentCategoryName: null,
  currentCategoryColor: null
};
interface CategoryPayload {
  id: string | null;
  name: string | null;
  color: string | null;
}
export const AccountSlice = createSlice({
  name: "Accounts",
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
        id: "total",
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
    
    SET_CURRENT_CATEGORY(state, action: PayloadAction<CategoryPayload>) {
      const { id, name, color } = action.payload;
      
      state.currentCategoryId = id;
      state.currentCategoryName = name;
      state.currentCategoryColor = color;
    },
    CREATE_ACCOUNT(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    CREATE_ACCOUNT_SUCCESS(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
    },
    CREATE_ACCOUNT_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    
    },
  },
});

export const {
  FETCH_ACCOUNTS, FETCH_ACCOUNTS_ERROR, FETCH_ACCOUNTS_SUCCESS, SET_CURRENT_ACCOUNT_ID,SET_CURRENT_CATEGORY,CREATE_ACCOUNT,CREATE_ACCOUNT_SUCCESS,CREATE_ACCOUNT_ERROR
} = AccountSlice.actions;

export default AccountSlice.reducer;
