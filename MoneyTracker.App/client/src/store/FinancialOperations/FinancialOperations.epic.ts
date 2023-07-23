import {combineEpics, Epic, ofType} from "redux-observable";
import { from, mergeMap } from "rxjs";
import { store } from "../store";
import { Transaction } from "../../types/Transaction";
import {
    ADD_CREDIT_OPERATION,
    ADD_DEBIT_OPERATION,
    ADD_FINANCIAL_OPERATION_ERROR,
    ADD_FINANCIAL_OPERATION_SUCCESS,
    ADD_TRANSFER_OPERATION,
    CANCEL_FINANCIAL_OPERATION, CANCEL_FINANCIAL_OPERATION_ERROR, CANCEL_FINANCIAL_OPERATION_SUCCESS,
    FETCH_TRANSACTIONS_INFO,
    FETCH_TRANSACTIONS_INFO_ERROR,
    FETCH_TRANSACTIONS_INFO_SUCCESS
} from "./FinancialOperations.slice";
import {request} from "../../api/core";
import {
    AddCredit,
    AddDebit,
    AddTransfer,
    CancelOperation,
    GetTransactions
} from "../../api/queries/FinancialOperations";


export const TransactionItemsEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(FETCH_TRANSACTIONS_INFO),
    mergeMap((action) => from(request(GetTransactions, action.payload)).pipe(

        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [FETCH_TRANSACTIONS_INFO_ERROR(data.errors[0].message)];
              } else {
                const transactions: Transaction[] =
                  data.data.financialOperation.getAccountsTransactions.transactions;
                const incomes = data.data.financialOperation.getAccountsTransactions.incomes;
                const expenses = data.data.financialOperation.getAccountsTransactions.expenses;
                return [
                  FETCH_TRANSACTIONS_INFO_SUCCESS({
                    transactions,
                    incomes,
                    expenses
                  }),
                ];
              }
            })
          )
        )
      )
    )
  )
}


export const AddDebitOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {

  return action$.pipe(
    ofType(ADD_DEBIT_OPERATION),
    mergeMap((action) => from(
          request(AddDebit, action.payload)
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
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
      )
    )
  )
}


export const AddCreditOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {

  return action$.pipe(
    ofType(ADD_CREDIT_OPERATION),
    mergeMap((action) => from(
          request(AddCredit, action.payload)
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
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
      )
    )
  )
}

export const AddTransferOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {

  return action$.pipe(
    ofType(ADD_TRANSFER_OPERATION),
    mergeMap((action) => from(
          request(AddTransfer, action.payload)

      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
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
      )
    )
  )
}

export const CancelFinancialOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {

  return action$.pipe(
    ofType(CANCEL_FINANCIAL_OPERATION),
    mergeMap((action) => from(
          request(CancelOperation, action.payload)
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
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
      )
    )
  )
}

export const FinancialOperationEpics = combineEpics(
    TransactionItemsEpic,
    AddDebitOperationEpic,
    AddCreditOperationEpic,
    AddTransferOperationEpic,
    CancelFinancialOperationEpic
)