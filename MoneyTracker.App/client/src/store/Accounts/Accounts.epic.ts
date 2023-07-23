import { Epic, combineEpics, ofType } from "redux-observable";
import { from, mergeMap } from "rxjs";
import { FETCH_ACCOUNTS, FETCH_ACCOUNTS_ERROR, FETCH_ACCOUNTS_SUCCESS } from "./Accounts.slice";
import { request } from "../../api/core"
import { GetAccounts } from "../../api/queries/Accounts";

export const fetchAccountsEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(FETCH_ACCOUNTS),
    mergeMap((action) => from(request(GetAccounts)
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [FETCH_ACCOUNTS_ERROR(data.errors[0].message)];
              } else {
                const accounts = data.data.account.getUserAccounts.accounts;
                const total = data.data.account.getUserAccounts.total;
                return [
                  FETCH_ACCOUNTS_SUCCESS({
                    accounts: accounts,
                    total: total
                  }),
                ];
              }
            })
          )
        )
      )
    )
  );
};

export const AccountEpics = combineEpics(fetchAccountsEpic)