import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../types/Account";

export interface TimeTravelState {
  datetime: string | null;
}

const initialState: TimeTravelState = {
  datetime: null,
};

export const TimeTravelSlice = createSlice({
  name: "TimeTravel",
  initialState: initialState,
  reducers: {
    SET_DATETIME(state, action: PayloadAction<string | null>) {
        state.datetime = action.payload;
    },
  },
});

export const { SET_DATETIME } = TimeTravelSlice.actions;

export default TimeTravelSlice.reducer;
