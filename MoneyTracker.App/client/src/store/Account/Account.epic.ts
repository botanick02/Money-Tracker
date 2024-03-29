import { Epic, combineEpics, ofType } from "redux-observable";
import { from, mergeMap, catchError } from "rxjs"; 
import { of } from "rxjs"; 
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_ERROR,
  FETCH_ACCOUNTS_SUCCESS,
} from "./Account.slice";
import { request } from "../../api/core";
import { CreateAccount, GetAccounts } from "../../api/queries/Accounts";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { REFRESH_ACCESS_TOKEN, SIGN_IN_ERROR } from "../Auth/Auth.slice";

export const fetchAccountsEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(FETCH_ACCOUNTS),
    mergeMap(() =>
      from(request(GetAccounts)).pipe(
        mergeMap((data: any) => {
          if (data.errors) {
           
           
            return [REFRESH_ACCESS_TOKEN()];
          } else {
            const accounts = data.data.account.getUserAccounts.accounts;
            const total = data.data.account.getUserAccounts.total;
            return [
              FETCH_ACCOUNTS_SUCCESS({
                accounts: accounts,
                total: total,
              }),
            ];
          }
        })
      )
    )
  );
};

export const createAccountEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(CREATE_ACCOUNT),
    mergeMap((action) =>
      from(request(CreateAccount, { accountName: action.payload })).pipe(
        mergeMap((data) => {
          if (data.errors) {
            return of(CREATE_ACCOUNT_ERROR(data.errors[0].message));
          } else {
            const newAccount = data.data.createAccount;
            return of(
              CREATE_ACCOUNT_SUCCESS(newAccount),
              { type: FETCH_ACCOUNTS } // Dispatching FETCH_ACCOUNTS action here
            );
          }
        }),
        catchError((error) => of(CREATE_ACCOUNT_ERROR("An error occurred")))
      )
    )
  );
};

export const AccountEpics = combineEpics(fetchAccountsEpic, createAccountEpic);
