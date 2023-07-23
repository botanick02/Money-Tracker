export const GetTransactions = `query getTransactions($input: GetTransactionsForAccountsInputType!){
    financialOperation{
     getAccountsTransactions(input: $input) {
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
  }`

export const AddDebit = `mutation addDebit($debitOperation: DebitOperationInputType!){
      financialOperation{
        addDebitOperation(debitOperation: $debitOperation)
      }
    }`;

export const AddCredit = `mutation addDebit($creditOperation: CreditOperationInputType!){
      financialOperation{
        addCreditOperation(creditOperation: $debitOperation)
      }
    }`;
export const AddTransfer = `mutation addDebit($transferOperation: TransferOperationInputType!){
      financialOperation{
        addTransferOperation(transferOperation: $debitOperation)
      }
    }`;

export const CancelOperation = `mutation cancelOperation($cancelFinOperationInput: CancelFinancialOperationInputType!) {
      financialOperation {
        cancelFinancialOperation(cancelFinOperationInput: $cancelFinOperationInput)
      }
    } `