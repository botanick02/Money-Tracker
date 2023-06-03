import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {exampleSlice} from "./Example/Example.slice";
import {exampleEpics} from "./Example/Example.epic";

const epicMiddleware = createEpicMiddleware()

const rootEpic = combineEpics(
    exampleEpics
)

const rootReducer = combineReducers({
    example: exampleSlice.reducer
})

export const store = configureStore({
    reducer: {
        rootReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(epicMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
epicMiddleware.run(rootEpic)