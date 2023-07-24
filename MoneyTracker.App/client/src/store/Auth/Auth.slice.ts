import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegistrationVariables {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  loading: boolean;
  error: null | string;
  isAuth: boolean;
}

const initialState: AuthState = {
  error: null,
  loading: false,
  isAuth: localStorage.getItem("accessToken") ? true : false,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    SIGN_IN(state, action: PayloadAction<LoginCredentials>) {
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
    REFRESH_ACCESS_TOKEN(
      state,
      action: PayloadAction<{ nextActions: AnyAction[] } | undefined>
    ) {
      state.loading = true;
    },
    REFRESH_ACCESS_TOKEN_SUCCESS(state) {
      state.loading = false;
    },
    REFRESH_ACCESS_TOKEN_ERROR(state) {
      state.loading = false;
    },
    REGISTRATION(state, action: PayloadAction<RegistrationVariables>) {
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
    },
  },
});

export const {
  SIGN_IN,
  SIGN_IN_GOOGLE,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
  REFRESH_ACCESS_TOKEN,
  REFRESH_ACCESS_TOKEN_ERROR,
  REFRESH_ACCESS_TOKEN_SUCCESS,
  REGISTRATION,
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
} = AuthSlice.actions;

export default AuthSlice.reducer;
