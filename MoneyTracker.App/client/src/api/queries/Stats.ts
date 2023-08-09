export const GetStats = `
query getStatistics($input: GetStatisticsForAccountsInputType!) {
  statistics {
    negativeTransactions(input: $input) {
      categoryName
      categoryId
      sum
      percentage
    }
    positiveTransactions(input: $input) {
      categoryName
      categoryId
      sum
      percentage
    }
  }
}
`;
