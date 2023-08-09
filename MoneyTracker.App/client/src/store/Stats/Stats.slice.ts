import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stats } from "../../types/Stats";

export interface FetchStatsState {
  filter: "income" | "expense";
  loading: boolean;
  error: null | string;
  positiveStats: Stats[];
  negativeStats: Stats[];
  editSuccess: boolean;
}

const initialState: FetchStatsState = {
  error: null,
  loading: false,
  positiveStats: [],
  negativeStats: [],
  editSuccess: false,
  filter: "expense",
};
export interface FetchStatsVariables {
  accountId: string | null;
  fromDate: string | null;
  toDate: string | null;
}




export const StatsSlice = createSlice({
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

      const { stats } = action.payload;
      state.positiveStats = stats.filter((stat) => stat.sum >= 0);
      state.negativeStats = stats.filter((stat) => stat.sum < 0);
    },
    FETCH_STATS_ERROR(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    CHANGE_STATS_FILTER(state, action: PayloadAction<"income" | "expense">) {
      state.filter = action.payload;
    
    },
    
  
    
  },
});


export const {
  FETCH_STATS,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_ERROR,
  CHANGE_STATS_FILTER

} = StatsSlice.actions;

export default StatsSlice.reducer;
