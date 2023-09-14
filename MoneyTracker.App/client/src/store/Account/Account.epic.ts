import { Epic, combineEpics, ofType } from "redux-observable";
import { from, mergeMap, catchError } from "rxjs"; 
import { of } from "rxjs"; 
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
  FETCH_ACCOUNTS,
  DELETE_ACCOUNT,
  FETCH_ACCOUNTS_SUCCESS,
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_SUCCESS,
  SET_CURRENT_ACCOUNT_ID
} from "./Account.slice";
import { request } from "../../api/core";
import { CreateAccount, GetAccounts, deleteAccount } from "../../api/queries/Accounts";

import { REFRESH_ACCESS_TOKEN,  } from "../Auth/Auth.slice";

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

export const CreateAccountEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(CREATE_ACCOUNT),
    mergeMap((action) =>
    
      from(request(CreateAccount, {
        
        addAccount: action.payload
      })).pipe(
        mergeMap((data) => {
          if (data.errors) {
            return of(CREATE_ACCOUNT_ERROR(data.errors[0].message));
          } else {
            const newAccount = data.data.createAccount;
            return of(
              CREATE_ACCOUNT_SUCCESS(newAccount),
              FETCH_ACCOUNTS()
            );
          }
        }),
        catchError((error) => of(CREATE_ACCOUNT_ERROR("error")))
      )
    )
  );
};





export const deleteAccountEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(DELETE_ACCOUNT),
    mergeMap((action) =>
    from(request(deleteAccount, {  accountID: action.payload.accountID } ))
    .pipe(
        mergeMap((data) => {
          if (data.errors) {
            return of(DELETE_ACCOUNT_ERROR(data.errors[0].message));
          } else {
            
            return of(
              DELETE_ACCOUNT_SUCCESS(data),
              { type: FETCH_ACCOUNTS } ,
              SET_CURRENT_ACCOUNT_ID("total")
            );
          }
        }),
        catchError((error) => of(CREATE_ACCOUNT_ERROR("An error occurred")))
      )
    )
  );
};

export const AccountEpics = combineEpics(fetchAccountsEpic, CreateAccountEpic,deleteAccountEpic);
