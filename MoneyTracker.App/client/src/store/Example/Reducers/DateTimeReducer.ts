import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DateTimeState {
  dateTime: string | null;
}
const currentDate = new Date().toISOString().substring(0, 19);
const initialState: DateTimeState = {
  dateTime: currentDate,
};
console.log(currentDate)
export const DateTimeReducer = createSlice({
  name: "DateTime",
  initialState: initialState,
  reducers: {
    SET_DATE_TIME(state, action: PayloadAction<string>) {
      state.dateTime = action.payload;
      console.log(action.payload)
    },
    CLEAR_DATE_TIME(state) {
      state.dateTime = null;
    },
  },
});

export const { SET_DATE_TIME, CLEAR_DATE_TIME } = DateTimeReducer.actions;

export default DateTimeReducer.reducer;
