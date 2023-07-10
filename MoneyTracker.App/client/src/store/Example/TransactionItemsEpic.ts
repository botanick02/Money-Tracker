import { Epic, ofType } from "redux-observable";
import { from, mergeMap } from "rxjs";
import { store } from "../store";
import { NotificationReducer } from "./Reducers/NotificationReducer";
import { TransactionItemsReducer } from "./Reducers/TransactionItemsReducer";
import { ITransactionType } from "../../types/ITransactionType";
import { GraphQlEndpoint } from "../../api/queries/tmp";

const { SHOW_ERROR_MESSAGE } = NotificationReducer.actions;
const { FETCH_TRANSACTIONS,FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_ERROR } = TransactionItemsReducer.actions;

export const TransactionItemsEpic: Epic<any, any, any> = (action$, state$) => {
  const transactionQuery = (dateTimeTo: string | null) => {
    return `
      query {
        transaction {
          getTransactions(dateTimeTo: "${dateTimeTo}") {
            userId
            title
            note
            amount
            categoryId
            createdAt
            accountId
          }
        }
      }
    `;
  };

  return action$.pipe(
    ofType(FETCH_TRANSACTIONS),
    mergeMap((action) => {
      const { dateTimeTo } = action.payload;

      return from(
        fetch(GraphQlEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: transactionQuery(dateTimeTo),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              console.log(data);
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [FETCH_TRANSACTIONS_ERROR(data.errors[0].message)];
              } else {
                const transactions: ITransactionType[] = data.data.transaction.getTransactions;
                console.log(transactions);
                return [
                  FETCH_TRANSACTIONS_SUCCESS({
                    transactions,
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
