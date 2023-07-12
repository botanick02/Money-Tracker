import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../hooks/useAppDispatch";

export interface Account {
  actualAccount: string 
  actualBalance:number
  actuaIncomelBalance:number
  actualExpenseBalance:number
}

const initialState: Account = {
  actualAccount: "645645646",
  actualBalance:0,
  actuaIncomelBalance:0,
  actualExpenseBalance:0
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
      state.actualAccount = "645645646";
      
    },
    SET_ACTUAL_BALANCE(state, action: PayloadAction<number>) {
      state.actualBalance = action.payload;;
      console.log(action.payload)
    },
    SET_ACTUAL_INCOME_BALANCE(state, action: PayloadAction<number>) {
      state.actuaIncomelBalance = action.payload;
      console.log(action.payload)
    },
    SET_ACTUAL_EXPENSE_BALANCE(state, action: PayloadAction<number>) {
      state.actualExpenseBalance = action.payload;
      console.log(action.payload)
    },
  },
});

export const { SET_ACTUAL_ACCOUNT, CLEAR_ACTUAL_ACCOUNT,SET_ACTUAL_BALANCE,SET_ACTUAL_EXPENSE_BALANCE } = AccountReducer.actions;

export default AccountReducer.reducer;
