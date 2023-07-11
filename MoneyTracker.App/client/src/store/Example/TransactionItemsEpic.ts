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
      {
        transaction {
          getTransactions {
            id
            transactionId
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
            Authorization: "Bearer " + localStorage.getItem("accessToken")
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

const {
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_ERROR,
} = TransactionItemsReducer.actions;

export const addTransactionEpic: Epic<any, any, any> = (action$, state$) => {
  const addTransactionMutation = (categoryId: string, amount: number, title: string,fromAccountId: string,toAccountId: string,) => {
    return `mutation {
      transaction {
        addTransaction(
          transaction: {
             amount:${amount}
            categoryId: "${categoryId}"
            title: "${title}"
            fromAccountId: "${fromAccountId}"
            toAccountId: "${toAccountId}"
          }
        )
      }
    }`;
  };

  return action$.pipe(
    ofType(ADD_TRANSACTION),
    mergeMap((action) => {
      const { categoryId, amount,title,fromAccountId,toAccountId } = action.payload;
      return from(
        fetch(GraphQlEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken")
          },
          body: JSON.stringify({
            query: addTransactionMutation(categoryId, amount,title,fromAccountId,toAccountId),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              console.log(data);
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [ADD_TRANSACTION_ERROR(data.errors[0].message)];
              } else {
                return [ADD_TRANSACTION_SUCCESS({ addTransactionSuccess: true })];
              }
            })
          )
        )
      );
    })
  );
};


const {
  CANCEL_TRANSACTION,
  CANCEL_TRANSACTION_SUCCESS,
  CANCEL_TRANSACTION_ERROR,
} = TransactionItemsReducer.actions;

export const cancelTransactionEpic: Epic<any, any, any> = (action$, state$) => {
  const cancelTransactionMutation = (transactionId: string) => {
    return `mutation {
      transaction {
    cancelTransaction(cancelTransactionInput: { transactionId: "${transactionId}" })
      }
    } `;
  };

  return action$.pipe(
    ofType(CANCEL_TRANSACTION),
    mergeMap((action) => {
      const { transactionId} = action.payload;
      return from(
        fetch(GraphQlEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken")
          },
          body: JSON.stringify({
            query: cancelTransactionMutation(transactionId),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              console.log(data);
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [CANCEL_TRANSACTION_ERROR(data.errors[0].message)];
              } else {
                return [CANCEL_TRANSACTION_SUCCESS({ cancelTransactionSuccess: true })];
              }
            })
          )
        )
      );
    })
  );
};
