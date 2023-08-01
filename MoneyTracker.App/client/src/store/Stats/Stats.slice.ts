import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stats } from "../../types/Stats";

export interface FetchStatsState {
  loading: boolean;
  error: null | string;
  stats: Stats[];
  editSuccess: boolean;
}

const initialState: FetchStatsState = {
  error: null,
  loading: false,
  stats: [],
  editSuccess: false,
};

export const CategorySlice = createSlice({
  name: "Stats",
  initialState: initialState,
  reducers: {
    FETCH_STATS(state) {
      state.loading = true;
      state.error = null;
    },
    FETCH_STATS_SUCCESS(
      state,
      action: PayloadAction<{ stats: Stats[] }>
    ) {
      state.loading = false;
      state.error = null;
      state.stats = action.payload.stats;
    },
    FETCH_STATS_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  FETCH_STATS,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_ERROR,

} = CategorySlice.actions;

export default CategorySlice.reducer;
