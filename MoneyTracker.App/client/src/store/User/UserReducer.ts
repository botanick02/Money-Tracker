import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";



export interface UserStore {
    loading: boolean;
    error?: string;
    user?: User;
}

const initialState: UserStore = {
    loading: false,
};

export const UserReducer = createSlice({
    name: "UserReducer",
    initialState: initialState,
    reducers: {
        GET_USER_INFO(state) {
            state.user = undefined;
            state.loading = true;
        },
        GET_USER_INFO_SUCCESS(state, action: PayloadAction<User>) {
            let user: User = {
                name: action.payload.name,
                email: action.payload.email,
            };
            state.user = user;
        },
        GET_USER_INFO_ERROR(state, action: PayloadAction<string>) {
            state.user = undefined;
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export default UserReducer.reducer;