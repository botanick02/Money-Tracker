import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserType } from "../../../types/IUserType";
import { QueryUserType } from "../../../types/GraphQLType";



export interface CreateUserState {
    loading: boolean;
    error: null | string;
    userInfo: null | IUserType;
}

const initialState: CreateUserState = {
    error: null,
    loading: false,
    userInfo: null,
};

export const UserReducer = createSlice({
    name: "UserReducer",
    initialState: initialState,
    reducers: {
        GET_USER_INFO(state) {
            state.userInfo = null;
            state.loading = true;
        },
        GET_USER_INFO_SUCCESS(state, action: PayloadAction<QueryUserType>) {
            let user: IUserType = {
               
            
                name: action.payload.name,
        
                email: action.payload.email,

            };
            state.userInfo = user;
        },
        GET_USER_INFO_ERROR(state, action: PayloadAction<string>) {
            state.userInfo = null;
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export default UserReducer.reducer;