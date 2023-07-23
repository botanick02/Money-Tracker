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

export const AddCredit = `mutation addCredit($creditOperation: CreditOperationInputType!){
      financialOperation{
        addCreditOperation(creditOperation: $creditOperation)
      }
    }`;
export const AddTransfer = `mutation addTransfer($transferOperation: TransferOperationInputType!){
      financialOperation{
        addTransferOperation(transferOperation: $transferOperation)
      }
    }`;

export const CancelOperation = `mutation cancelOperation($cancelFinOperationInput: CancelFinancialOperationInputType!) {
      financialOperation {
        cancelFinancialOperation(cancelFinOperationInput: $cancelFinOperationInput)
      }
    } `