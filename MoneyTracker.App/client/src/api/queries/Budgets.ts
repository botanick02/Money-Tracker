export const GetBudgets = `
    query getBudgets{
        budget {
          getBudgets {
            id
            name
            type
            isActive
          }
        }
  }
`