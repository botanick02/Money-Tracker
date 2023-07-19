import { Epic, ofType } from "redux-observable";
import { FETCH_ACCOUNTS, FETCH_ACCOUNTS_ERROR, FETCH_ACCOUNTS_SUCCESS } from "./Reducers/AccountReducer";
import { from, mergeMap } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";
import { GraphQlEndpoint } from "../../api/queries/tmp";
import { store } from "../store";
import { NotificationReducer } from "./Reducers/NotificationReducer";
const { SHOW_ERROR_MESSAGE } = NotificationReducer.actions;


export const fetchAccountsEpic: Epic<any, any, any> = (action$, state$) => {
  const fetchQuery = `
      query getPersonalAccounts{
        account{
          getUserAccounts{
            accounts{
              id
              name
              currency{
                code
                symbol
              }
              balance
            }
            total
          }
        }
      }
      `;

  return action$.pipe(
    ofType(FETCH_ACCOUNTS),
    mergeMap((action) => {
      return from(
        fetch(GraphQlEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: JSON.stringify({
            query: fetchQuery,
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
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
      );
    })
  );
};
