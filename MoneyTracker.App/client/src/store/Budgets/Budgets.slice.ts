import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Budget} from "../../types/Budget";

interface BudgetState {
    budgetList: Budget[]
}

const initialState: BudgetState = {
    budgetList: []
}

const budgetListSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        fetch_budget:(state, action:PayloadAction<Budget>) => {
            return {...state, user: action.payload}
        }
    }
})


export const fetchBudgetAction = createAction<string>("fetchUser");
export default budgetListSlice;
export const {fetch_budget} = budgetListSlice.actions