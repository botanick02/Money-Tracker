import { FinancialOperationSlice } from './FinancialOperation/FinancialOperation.slice';
import { CategoriesEpics } from './Category/Category.epic';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { FinancialOperationEpics } from './FinancialOperation/FinancialOperation.epic';
import { AuthEpics } from './Auth/Auth.epic';
import { AccountEpics } from './Account/Account.epic';
import { CategorySlice } from './Category/Category.slice';
import { AccountSlice }  from './Account/Account.slice'
import { AuthSlice } from './Auth/Auth.slice';
import {BudgetEpics} from "./Budgets/Budgets.epic";
import BudgetListSlice from "./Budgets/Budgets.slice";
import {GetStatsEpics} from "./Stats/Stats.epic";
import {StatsSlice} from "./Stats/Stats.slice";

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
  CategoriesEpics,
  FinancialOperationEpics,
  AuthEpics,
  AccountEpics,
  BudgetEpics,
  GetStatsEpics
);

const rootReducer = combineReducers({
  Category: CategorySlice.reducer,
  FinancialOperation: FinancialOperationSlice.reducer,
  Account: AccountSlice.reducer,
  Auth: AuthSlice.reducer,
  Budgets: BudgetListSlice.reducer,
  Stats: StatsSlice.reducer

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
