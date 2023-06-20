import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface UserState {
    loading: boolean;
    error: null | string;
    isAuth: boolean;
  
}

const initialState: UserState = {
    error: null,
    loading: false,
    isAuth: localStorage.getItem("accessToken") ? true : false,
  
};

export const AuthorizationReducer = createSlice({
    name: "User",
    initialState: initialState,
    reducers: {
        SIGN_IN(state, action: PayloadAction<{ email: string; password: string }>) {
            state.loading = true;
            state.error = null;
            state.isAuth = false;
        },
        SIGN_IN_GOOGLE(state, action: PayloadAction<{ token: string }>) {
            state.loading = true;
            state.error = null;
            state.isAuth = false;
        },
        SIGN_IN_SUCCESS(state) {
            state.isAuth = true;
            state.loading = false;
            state.error = null;
        },
        SIGN_IN_ERROR(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isAuth = false;
            state.loading = false;
        },
        SIGN_OUT(state) {
            state.loading = true;
        },
        SIGN_OUT_SUCCESS(state) {
            state.loading = false;
            state.isAuth = false;
        },
        SIGN_OUT_ERROR(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export default AuthorizationReducer.reducer;