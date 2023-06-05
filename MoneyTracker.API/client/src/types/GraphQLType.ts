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
  
  export interface IUserQuery {
    data: IUserData;
  }
  
  interface IUserData {
    auth: IUser;
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
    id: number;
    name: string;
    email: string;
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
    data: { user: { create: ICreateUserResponse } };
  }
  
  interface ICreateUserResponse {
    statusCode: number;
    errors: any[];
    user: IUserType;
  }
  