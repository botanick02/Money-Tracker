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
        }
        total
      }
    }
  }
  `

  export const CreateAccount = `
  mutation createAccount($accountName: String!) {
    account {
      createAccount(accountName: $accountName)
    }
  }
`;
 

export const deleteAccount = `mutation DeleteAccount($accountID: String!) {
  account {
    deleteAccount(accountID: $accountID)
  }
}
`;
