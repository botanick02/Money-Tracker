export const GetStats = `
query getStatistics($input: GetStatisticsForAccountsInputType!) {
  statistics {
    negativeTransactions(input: $input) {
      categoryName
      categoryId
      sum
      percentage
      color
    }
    positiveTransactions(input: $input) {
      categoryName
      categoryId
      sum
      percentage
      color
    }
  }
}
`;
