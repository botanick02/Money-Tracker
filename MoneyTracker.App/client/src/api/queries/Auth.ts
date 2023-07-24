export const Login = `
mutation login($loginCredentials: LoginInputType!){
    auth{
    login(loginCredentials: $loginCredentials){
      accessToken
    }
  }
}
`;

export const GoogleLogin = `
mutation login($loginCredentials: GoogleLoginInputType!){
    auth{
      googleLogin(loginCredentials: $loginCredentials){
      accessToken
    }
  }
}`;

export const RefreshAccessToken = `
mutation refresh{
    auth{
      refreshToken{
        accessToken
      }
    }
  }`

export const logOut = `
mutation logOut {
    auth {
      logOut
    }
  }
  `

export const Register = `
mutation register($createUser: UserCreateInputType!){
    auth{
    createUser(
        createUser: $createUser
    ){
        accessToken
    }
  
  }
}`