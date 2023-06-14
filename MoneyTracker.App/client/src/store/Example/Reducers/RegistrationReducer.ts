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

export const RegistrationReducer = createSlice({
    name: "Registration",
    initialState: initialState,
    reducers: {
        REGISTRATION(state, action: PayloadAction<{ name: string;  email:string; password: string }>) {
            state.loading = true;
            state.error = null;
            state.isAuth = false;
        },
        REGISTRATION_SUCCESS(state) {
            state.isAuth = true;
            state.loading = false;
            state.error = null;
        },
        REGISTRATION_ERROR(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isAuth = false;
            state.loading = false;
        }

    },
});

export default RegistrationReducer.reducer;