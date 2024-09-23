export const GetStats = `
query getStatistics($input: GetStatisticsForAccountsInput!) {
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
