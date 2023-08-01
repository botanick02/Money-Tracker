export const GetStats = `
query getStatistics{
  statistics {
    getStatistics(input: {}) {
      categoryName
      sum
      percentage
    }
  }
}

`
