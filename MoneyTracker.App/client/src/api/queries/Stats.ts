export const GetStats = `
query getStatistics($input: GetStatisticsForAccountsInputType!) {
  statistics {
    negativeTransactions(input: $input) {
      categoryName
      sum
      percentage
    }
    positiveTransactions(input: $input) {
      categoryName
      sum
      percentage
    }
  }
}
`;
