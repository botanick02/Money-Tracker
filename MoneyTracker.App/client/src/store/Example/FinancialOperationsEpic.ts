import { Epic, ofType } from "redux-observable";
import { from, mergeMap } from "rxjs";
import { store } from "../store";
import { NotificationReducer } from "./Reducers/NotificationReducer";
import { TransactionItemsReducer } from "./Reducers/FinancialOperationsReducer";
import { Transaction } from "../../types/ITransactionType";
import { GraphQlEndpoint } from "../../api/queries/tmp";

const { SHOW_ERROR_MESSAGE } = NotificationReducer.actions;
const {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_ERROR,
} = TransactionItemsReducer.actions;

export const TransactionItemsEpic: Epic<any, any, any> = (action$, state$) => {
  const transactionQuery = (accountId?: string) => {
    return `query getTransactions{
      financialOperation{
       getAccountsTransactions(input: {accountId: ${accountId ? `"${accountId}"` : "null"}}) {
        transactions {
          id
          operationId
          userId
          title
          note
          amount
          categoryId
          createdAt
          accountId
        }
        expenses
        incomes
      } 
      }
    }
    `;
  };

  return action$.pipe(
    ofType(FETCH_TRANSACTIONS),
    mergeMap((action) => {
      const { accountId } = action.payload;

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
            query: transactionQuery(accountId),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [FETCH_TRANSACTIONS_ERROR(data.errors[0].message)];
              } else {
                const transactions: Transaction[] =
                  data.data.financialOperation.getAccountsTransactions.transactions;
                const incomes = data.data.financialOperation.getAccountsTransactions.incomes;
                const expenses = data.data.financialOperation.getAccountsTransactions.expenses;
                return [
                  FETCH_TRANSACTIONS_SUCCESS({
                    transactions,
                    incomes,
                    expenses
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

export default TransactionItemsEpic;

const {
  ADD_DEBIT_OPERATION,
  ADD_CREDIT_OPERATION,
  ADD_TRANSFER_OPERATION,
  ADD_FINANCIAL_OPERATION_SUCCESS,
  ADD_FINANCIAL_OPERATION_ERROR,
} = TransactionItemsReducer.actions;


export const addDebitOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {
  const addFinancialOperationMutation = (
    categoryId: string,
    amount: number,
    title: string,
    accountId: string
  ) => {
    return `mutation{
      financialOperation{
        addDebitOperation(
        debitOperation: {
          amount: ${amount}
          categoryId: "${categoryId}"
          title: "${title}"
          toAccountId: "${accountId}"
        }
      )
      }
    }`;
  };

  return action$.pipe(
    ofType(ADD_DEBIT_OPERATION),
    mergeMap((action) => {
      const { categoryId, amount, title, accountId } =
        action.payload;
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
            query: addFinancialOperationMutation(
              categoryId,
              amount,
              title,
              accountId,
            ),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [ADD_FINANCIAL_OPERATION_ERROR(data.errors[0].message)];
              } else {
                return [
                  ADD_FINANCIAL_OPERATION_SUCCESS({
                    addTransactionSuccess: true,
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


export const addCreditOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {
  const addFinancialOperationMutation = (
    categoryId: string,
    amount: number,
    title: string,
    accountId: string
  ) => {
    return `mutation{
      financialOperation{
        addCreditOperation(
          creditOperation: {
          amount: ${amount}
          categoryId: "${categoryId}"
          title: "${title}"
          fromAccountId: "${accountId}"
        }
      )
      }
    }`;
  };

  return action$.pipe(
    ofType(ADD_CREDIT_OPERATION),
    mergeMap((action) => {
      const { categoryId, amount, title, accountId } =
        action.payload;
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
            query: addFinancialOperationMutation(
              categoryId,
              amount,
              title,
              accountId,
            ),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [ADD_FINANCIAL_OPERATION_ERROR(data.errors[0].message)];
              } else {
                return [
                  ADD_FINANCIAL_OPERATION_SUCCESS({
                    addTransactionSuccess: true,
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

export const addTransferOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {
  const addFinancialOperationMutation = (
    categoryId: string,
    amount: number,
    title: string,
    fromAccountId: string,
    toAccountId: string
  ) => {
    return `mutation{
      financialOperation{
        addCreditOperation(
          creditOperation: {
          amount: ${amount}
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
    ofType(ADD_TRANSFER_OPERATION),
    mergeMap((action) => {
      const { categoryId, amount, title, fromAccountId, toAccountId } =
        action.payload;
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
            query: addFinancialOperationMutation(
              categoryId,
              amount,
              title,
              fromAccountId,
              toAccountId
            ),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [ADD_FINANCIAL_OPERATION_ERROR(data.errors[0].message)];
              } else {
                return [
                  ADD_FINANCIAL_OPERATION_SUCCESS({
                    addTransactionSuccess: true,
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
  CANCEL_FINANCIAL_OPERATION,
  CANCEL_FINANCIAL_OPERATION_ERROR,
  CANCEL_FINANCIAL_OPERATION_SUCCESS,
} = TransactionItemsReducer.actions;

export const cancelFinancialOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {
  const cancelFinancialOperationMutation = (transactionId: string) => {
    return `mutation {
      financialOperation {
        cancelFinancialOperation(cancelFinOperationInput: { operationId: "${transactionId}" })
      }
    } `;
  };

  return action$.pipe(
    ofType(CANCEL_FINANCIAL_OPERATION),
    mergeMap((action) => {
      const { transactionId } = action.payload;
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
            query: cancelFinancialOperationMutation(transactionId),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [
                  CANCEL_FINANCIAL_OPERATION_ERROR(data.errors[0].message),
                ];
              } else {
                return [
                  CANCEL_FINANCIAL_OPERATION_SUCCESS({
                    cancelTransactionSuccess: true,
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
