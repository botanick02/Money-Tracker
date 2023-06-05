import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITokenState {
    loading: boolean;
}

const initialState: ITokenState = {
    loading: false,
};

export const RefreshTokenReducer = createSlice({
    name: "TokenReducer",
    initialState: initialState,
    reducers: {
        GET_ACCESS_TOKEN(state, action: PayloadAction<{ nextActions: AnyAction[] } | undefined>) {
            state.loading = true;
        },
        GET_ACCESS_TOKEN_SUCCESS(state) {
            state.loading = false;
        },
        GET_ACCESS_TOKEN_ERROR(state) {
            state.loading = false;
        },
    },
});

export default RefreshTokenReducer.reducer;