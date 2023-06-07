import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ExampleType} from "../../types/ExampleType";

interface exampleState {
    example: ExampleType[]
}

const initialState: exampleState = {
    example: []
}

export const exampleSlice = createSlice({
    name: "exampleSlice",
    initialState,
    reducers: {
        fetch_example:(state, action: PayloadAction<ExampleType[]>) => {
            return {...state, example: action.payload}
        }
    }
})

export const fetchExampleAction = createAction<undefined>("fetchExample")

export const {fetch_example} = exampleSlice.actions