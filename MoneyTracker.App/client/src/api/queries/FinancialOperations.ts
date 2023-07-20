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