import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeTravelState {
  showPopup: boolean;
  datetime: string | null;
}

const initialState: TimeTravelState = {
  showPopup: false,
  datetime: null,
};

export const TimeTravelSlice = createSlice({
  name: "TimeTravel",
  initialState: initialState,
  reducers: {
    SET_DATETIME(state, action: PayloadAction<string | null>) {
        state.datetime = action.payload;
    },
    SHOW_TIME_TRAVEL_POPUP(state, action: PayloadAction<boolean>) {
      state.showPopup = action.payload;
  },
  },
});

export const { SET_DATETIME, SHOW_TIME_TRAVEL_POPUP } = TimeTravelSlice.actions;

export default TimeTravelSlice.reducer;
