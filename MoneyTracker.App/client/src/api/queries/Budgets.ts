export const GetBudgets = `
    query getBudgets{
        budget {
          getBudgets {
            id,
            category{
              id
              name
              type
              color
              iconUrl
            },
            spent,
            limit,
            title 
          }
        }
  }
`

export const EditBudget = `
    mutation editBudget($budget: BudgetInputType!){
        budget {
          editBudget(budget: $budget)
        }
    }
`

export const CreateBudget = `
    mutation editBudget($budget: BudgetInputType!){
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