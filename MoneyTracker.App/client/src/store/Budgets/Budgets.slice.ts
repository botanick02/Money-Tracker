import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Budget, BudgetToCreate, BudgetToEdit} from "../../types/Budget";

interface BudgetState {
    budgetList: Budget[]
}

const initialState: BudgetState = {
    budgetList: []
}

const BudgetListSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        fetch_budget:(state, action:PayloadAction<Budget[]>) => {

            return {...state, budgetList: action.payload}
        }
    }
})


export const fetchBudgetAction = createAction<string>("fetchBudget");
export const editBudgetAction = createAction<BudgetToEdit>("EditBudget");
export const createBudgetAction = createAction<BudgetToCreate>("CreateBudget");
export const deleteBudgetAction = createAction<string>("DeleteBudget");
export default BudgetListSlice;
export const {fetch_budget} = BudgetListSlice.actions