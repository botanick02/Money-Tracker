export const GetAccounts = `
query getPersonalAccounts{
    account{
      getUserAccounts{
        accounts{
          id
          name
          currency{
            code
            symbol
          }
          balance
          isActive
        }
        total
        
        
      }
      
    }
  }
  `

  export const CreateAccount = `
  mutation createAccount($addAccount: CreateAccountInput!) {
    account {
      createAccount(addAccount: $addAccount)
    }
  }
`;
 

export const deleteAccount = `mutation DeleteAccount($accountID: String!) {
  account {
    deleteAccount(accountID: $accountID)
  }
}
`;
