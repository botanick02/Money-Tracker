export const GetBudgets = `
    query getBudgets{
        budget {
          getBudgets {
            id,
            category{
                id,
                name,
                type
            },
            spent,
            limit,
            endDate,
            startDate
          }
        }
  }
`