export interface LoginQuery {
  errors?: Error[];
  data: LoginData;
}

export interface GoogleLoginQuery {
  errors?: Error[];
  data: GoogleLoginData;
}

export interface Error {
  message: string;
  extensions: {
    code: string;
    codes: string[];
  };
}
export interface LoginData {
  auth: {
    createUser: boolean;
    login?: {
      accessToken: string;
    };
  };
}

export interface GoogleLoginData {
  auth: {
    createUser: boolean;
    googleLogin?: {
      accessToken: string;
    };
  };
}

export interface AccessToken {
  UserId: string;
  nbf: number;
  exp: number;
  iat: number;
}
