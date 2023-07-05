import { IUserType } from "./IUserType";

export interface IAuthResponse {
  auth: IAuthData;
}

interface IAuthData {
  login: ILoginResponse;
}

interface ILoginResponse {
  accessToken: string;
}

export interface ILoginQuery {
  errors: IError[] | null;
  data: ILoginData
}

export interface IGoogleLoginQuery {
  errors: IError[] | null;
  data: IGoogleLoginData
}

export interface IError {
  message: string;
  extensions: {
    code: string;
    codes: string[];
  };
}
export interface ILoginData {
  auth: {
    createUser: boolean;
    login: {
      accessToken: string;
    } | null;
  };
}

export interface IGoogleLoginData {
  auth: {
    createUser: boolean;
    googleLogin: {
      accessToken: string;
    } | null;
  };
}

interface IUser {
  login: ILoginResponse;
}

interface ILoginResponse {
  statusCode: number;
  token: string;
  refreshToken: string;
  user: QueryUserType;
}

export interface QueryUserType {
  isActive: string;
  type: string;
  id: number;
  name: string;
  email: string;
}
export interface QueryCategoryType {
  isActive: boolean;
  type: string;
  id: string;
  name: string;
 
}

export interface AccessToken {
  UserId: string;
  nbf: number;
  exp: number;
  iat: number;
}

export interface IRefreshTokenQuery {
  data: ITokenRefreshData;
}

interface ITokenRefreshData {
  user: IRefreshTokenUser;
}

interface IRefreshTokenUser {
  refreshToken: IRefreshToken;
}

export interface IRefreshToken {
  token: string;
  statusCode: number;
}

export interface ICreateUserQuery {
  data: {
    user: {
      create: {
        statusCode: number;
        errors: any[];
        user: IUserType;
      };
    };
  };
}


interface ICreateUserResponse {
  statusCode: number;
  errors: any[];
  user: IUserType;
}
export interface accessTokenType {
  UserId: string;
  nbf: number;
  exp: number;
  iat: number;
}
