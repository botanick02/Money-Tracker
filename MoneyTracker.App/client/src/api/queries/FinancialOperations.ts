export const GetTransactions = `query getTransactions($input: GetTransactionsForAccountsInput!){
    financialOperation{
     getAccountsTransactions(input: $input) {
      transactions {
        id
        operationId
        userId
        title
        note
        amount
        category{
          id
          name
          type
          iconUrl
          color
        }
        createdAt
        accountId
        accountName
        fromAccountId
        categoryId
      }
      expenses
      incomes
    } 
    }
  }`

export const AddDebit = `mutation addDebit($debitOperation: DebitOperationInput!){
      financialOperation{
        addDebitOperation(debitOperation: $debitOperation)
      }
    }`;

export const AddCredit = `mutation addCredit($creditOperation: CreditOperationInput!){
      financialOperation{
        addCreditOperation(creditOperation: $creditOperation)
      }
    }`;
export const AddTransfer = `mutation addTransfer($transferOperation: TransferOperationInput!){
      financialOperation{
        addTransferOperation(transferOperation: $transferOperation)
      }
    }`;

export const CancelOperation = `mutation cancelOperation($cancelFinOperationInput: CancelFinancialOperationInput!) {
      financialOperation {
        cancelFinancialOperation(cancelFinOperationInput: $cancelFinOperationInput)
      }
    } `

export const UpdateOperation = `mutation updT($input: UpdateFinancialOperationInput!){
  financialOperation{
  updateFinancialOperation(
    updatedFinancialOperaion: $input)
}
}`