export const GetBudgets = `
    query getBudgets{
        budget {
          getBudgets {
            id,
            categories{
              id
              name
              type
              color
              iconUrl
            },
            spent,
            limit,
            title,
            timeScope
          }
        }
  }
`

export const EditBudget = `
    mutation editBudget($budget: BudgetInput!){
        budget {
          editBudget(budget: $budget)
        }
    }
`

export const CreateBudget = `
    mutation editBudget($budget: BudgetInput!){
        budget {
          createBudget(budget: $budget)
        }
    }
`

export const DeleteBudget = `
    mutation editBudget($id: String!){
        budget {
          deleteBudget(id: $id)
        }
    }
`