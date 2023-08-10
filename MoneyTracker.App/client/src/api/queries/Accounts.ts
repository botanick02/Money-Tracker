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