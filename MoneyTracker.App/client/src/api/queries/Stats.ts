export const GetStats = `
query getStatistics{
  statistics {
    negativeTransactions(input: {}) {
      categoryName
      sum
      percentage
    }
  positiveTransactions(input: {}) {
      categoryName
      sum
      percentage
    }
  }
}


`
