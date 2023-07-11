import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {RegistrationEpic } from "./Example/RegistrationEpic";
import { AuthorizationEpic, GetAccessTokenEpic, GoogleAuthorizationEpic, SignOutEpic } from "./Example/AuthorizationEpic";
import UserReducer from "./Example/Reducers/UserReducer";
import NotificationReducer from "./Example/Reducers/NotificationReducer";
import AuthorizationReducer from "./Example/Reducers/AuthorizationReducer";
import RefreshTokenReducer from "./Example/Reducers/RefreshTokenReducer";
import RegistrationReducer from "./Example/Reducers/RegistrationReducer";
import CategoryReducer  from "./Example/Reducers/CategoryItemsReducer";
import { CategoryItemsEpic, EditCategoryEpic } from "./Example/CategoryItemsEpic";
import DateTimeReducer from "./Example/Reducers/DateTimeReducer";
import {TransactionItemsEpic, addTransactionEpic } from "./Example/TransactionItemsEpic";
import TransactionItemsReducer from "./Example/Reducers/TransactionItemsReducer";

const epicMiddleware = createEpicMiddleware()

const rootEpic = combineEpics(
    AuthorizationEpic,
    SignOutEpic,
    GetAccessTokenEpic,
    RegistrationEpic,
    GoogleAuthorizationEpic,
    CategoryItemsEpic,
    EditCategoryEpic,
    TransactionItemsEpic,
    addTransactionEpic
)

const rootReducer = combineReducers({
    Authorization: AuthorizationReducer,
    User: UserReducer,
    Notifications: NotificationReducer,
    RefreshToken: RefreshTokenReducer,
    Category:CategoryReducer,
    Registration:RegistrationReducer,
    DateTime:DateTimeReducer,
    TransactionItems:TransactionItemsReducer
 
})

export const store = configureStore({
    reducer: rootReducer
    ,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(epicMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
epicMiddleware.run(rootEpic)