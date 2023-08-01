export const getStatistics = `
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
