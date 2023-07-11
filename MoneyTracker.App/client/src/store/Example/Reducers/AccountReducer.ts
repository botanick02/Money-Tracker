import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Account {
  actualAccount: string | null;
}

const initialState: Account = {
  actualAccount: "Total",
};

export const AccountReducer = createSlice({
  name: "Account",
  initialState: initialState,
  reducers: {
    SET_ACTUAL_ACCOUNT(state, action: PayloadAction<string>) {
      state.actualAccount = action.payload;
      console.log(action.payload)
    },
    CLEAR_ACTUAL_ACCOUNT(state) {
      state.actualAccount = "Total";
    },
  },
});

export const { SET_ACTUAL_ACCOUNT, CLEAR_ACTUAL_ACCOUNT } = AccountReducer.actions;

export default AccountReducer.reducer;
