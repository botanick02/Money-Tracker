import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { RegistrationEpic } from "./Example/RegistrationEpic";
import {
  AuthorizationEpic,
  GetAccessTokenEpic,
  GoogleAuthorizationEpic,
  SignOutEpic,
} from "./Example/AuthorizationEpic";
import UserReducer from "./Example/Reducers/UserReducer";
import NotificationReducer from "./Example/Reducers/NotificationReducer";
import AuthorizationReducer from "./Example/Reducers/AuthorizationReducer";
import RefreshTokenReducer from "./Example/Reducers/RefreshTokenReducer";
import RegistrationReducer from "./Example/Reducers/RegistrationReducer";
import DateTimeReducer from "./Example/Reducers/DateTimeReducer";
import AccountReducer from "./Example/Reducers/AccountReducer";
import { fetchAccountsEpic } from "./Example/AccountEpic";
import {FinancialOperationsSlice} from "./FinancialOperations/FinancialOperations.slice";
import {CategoriesSlice} from "./Categories/Categories.slice";
import {FinancialOperationEpics} from "./FinancialOperations/FinancialOperations.epic";
import {CategoriesEpics} from "./Categories/Categories.epic";

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
  AuthorizationEpic,
  SignOutEpic,
  GetAccessTokenEpic,
  RegistrationEpic,
  GoogleAuthorizationEpic,
  fetchAccountsEpic,

  CategoriesEpics,
  FinancialOperationEpics
);

const rootReducer = combineReducers({
  Authorization: AuthorizationReducer,
  User: UserReducer,
  Notifications: NotificationReducer,
  RefreshToken: RefreshTokenReducer,
  Registration: RegistrationReducer,
  DateTime: DateTimeReducer,

  Categories: CategoriesSlice.reducer,
  FinancialOperations: FinancialOperationsSlice.reducer,

  Account: AccountReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
epicMiddleware.run(rootEpic);
