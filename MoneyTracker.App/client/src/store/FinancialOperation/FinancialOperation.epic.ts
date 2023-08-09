import { combineEpics, Epic, ofType } from "redux-observable";
import { from, mergeMap } from "rxjs";
import { Transaction } from "../../types/Transaction";
import {
  ADD_CREDIT_OPERATION,
  ADD_DEBIT_OPERATION,
  ADD_FINANCIAL_OPERATION_ERROR,
  ADD_FINANCIAL_OPERATION_SUCCESS,
  ADD_TRANSFER_OPERATION,
  CANCEL_FINANCIAL_OPERATION,
  CANCEL_FINANCIAL_OPERATION_ERROR,
  CANCEL_FINANCIAL_OPERATION_SUCCESS,
  FETCH_TRANSACTIONS_INFO,
  FETCH_TRANSACTIONS_INFO_ERROR,
  FETCH_TRANSACTIONS_INFO_SUCCESS,
  FetchTransactionsInfoVariables,
  UPDATE_FINANCIAL_OPERATION,
  UPDATE_FINANCIAL_OPERATION_ERROR,
  UPDATE_FINANCIAL_OPERATION_SUCCESS,
} from "./FinancialOperation.slice";
import { request } from "../../api/core";
import {
  AddCredit,
  AddDebit,
  AddTransfer,
  CancelOperation,
  GetTransactions,
  UpdateOperation,
} from "../../api/queries/FinancialOperations";
import { FETCH_ACCOUNTS } from "../Account/Account.slice";

export const TransactionItemsEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(FETCH_TRANSACTIONS_INFO),
    mergeMap((action) =>
      from(
        request(GetTransactions, {
          input: {
            accountId: state$.value.Account.currentAccountId !== "total" ? state$.value.Account.currentAccountId : null,
            fromDate: state$.value.FinancialOperation.dateRange.fromDate,
            toDate: state$.value.FinancialOperation.dateRange.toDate,
          } as FetchTransactionsInfoVariables
        })
      ).pipe(
        mergeMap((data: any) => {
          if (data.errors) {
            // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
            return [FETCH_TRANSACTIONS_INFO_ERROR(data.errors[0].message)];
          } else {
            const transactions: Transaction[] =
              data.data.financialOperation.getAccountsTransactions.transactions;
            const incomes =
              data.data.financialOperation.getAccountsTransactions.incomes;
            const expenses =
              data.data.financialOperation.getAccountsTransactions.expenses;
            return [
              FETCH_TRANSACTIONS_INFO_SUCCESS({
                transactions,
                incomes,
                expenses,
              }),
            ];
          }
        })
      )
    )
  );
};

export const AddDebitOperationEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_DEBIT_OPERATION),
    mergeMap((action) =>
      from(request(AddDebit, { debitOperation: action.payload })).pipe(
        mergeMap((data: any) => {
          if (data.errors) {
            // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
            return [ADD_FINANCIAL_OPERATION_ERROR(data.errors[0].message)];
          } else {
            return [
              ADD_FINANCIAL_OPERATION_SUCCESS({
                addTransactionSuccess: true,
              }),
              FETCH_TRANSACTIONS_INFO(),
              FETCH_ACCOUNTS()
            ];
          }
        })
      )
    )
  );
};

export const AddCreditOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {
  return action$.pipe(
    ofType(ADD_CREDIT_OPERATION),
    mergeMap((action) =>
      from(request(AddCredit, { creditOperation: action.payload })).pipe(
        mergeMap((data: any) => {
          if (data.errors) {
            // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
            return [ADD_FINANCIAL_OPERATION_ERROR(data.errors[0].message)];
          } else {
            return [
              ADD_FINANCIAL_OPERATION_SUCCESS({
                addTransactionSuccess: true,
              }),
              FETCH_TRANSACTIONS_INFO(),
              FETCH_ACCOUNTS()
            ];
          }
        })
      )
    )
  );
};

export const AddTransferOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {
  return action$.pipe(
    ofType(ADD_TRANSFER_OPERATION),
    mergeMap((action) =>
      from(request(AddTransfer, { transferOperation: action.payload })).pipe(
        mergeMap((data: any) => {
          if (data.errors) {
            // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
            return [ADD_FINANCIAL_OPERATION_ERROR(data.errors[0].message)];
          } else {
            return [
              ADD_FINANCIAL_OPERATION_SUCCESS({
                addTransactionSuccess: true,
              }),
              FETCH_TRANSACTIONS_INFO(),
              FETCH_ACCOUNTS()
            ];
          }
        })
      )
    )
  );
};

export const CancelFinancialOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {
  return action$.pipe(
    ofType(CANCEL_FINANCIAL_OPERATION),
    mergeMap((action) =>
      from(
        request(CancelOperation, { cancelFinOperationInput: action.payload })
      ).pipe(
        mergeMap((data: any) => {
          if (data.errors) {
            // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
            return [CANCEL_FINANCIAL_OPERATION_ERROR(data.errors[0].message)];
          } else {
            return [
              CANCEL_FINANCIAL_OPERATION_SUCCESS({
                cancelTransactionSuccess: true,
              }),
              FETCH_TRANSACTIONS_INFO(),
              FETCH_ACCOUNTS()
            ];
          }
        })
      )
    )
  );
};

export const UpdateFinancialOperationEpic: Epic<any, any, any> = (
  action$,
  state$
) => {
  return action$.pipe(
    ofType(UPDATE_FINANCIAL_OPERATION),
    mergeMap((action) =>
      from(
        request(UpdateOperation, { input: action.payload })
      ).pipe(
        mergeMap((data: any) => {
          if (data.errors) {
            // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
            return [UPDATE_FINANCIAL_OPERATION_ERROR(data.errors[0].message)];
          } else {
            return [
              UPDATE_FINANCIAL_OPERATION_SUCCESS(),
              FETCH_TRANSACTIONS_INFO(),
              FETCH_ACCOUNTS()
            ];
          }
        })
      )
    )
  );
};

export const FinancialOperationEpics = combineEpics(
  TransactionItemsEpic,
  AddDebitOperationEpic,
  AddCreditOperationEpic,
  AddTransferOperationEpic,
  CancelFinancialOperationEpic,
  UpdateFinancialOperationEpic
);
