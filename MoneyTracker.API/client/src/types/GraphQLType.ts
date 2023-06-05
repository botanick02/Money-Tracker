import { IUserType } from "./IUserType";

export interface IUserQuery {
  data: IUserData;
  extensions: any[];
  prototype: any[];
}

interface IUserData {
  authorization: IUser;
  prototype: any[];
}

interface IUser {
  login: ILoginResponse;
  prototype: any[];
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

export interface accessTokenType {
  UserId: string;
  nbf: number;
  exp: number;
  iat: number;
}

export interface IRefreshTokenQuery {
  data: ITokenRefreshData;
  prototype: any[];
}

interface ITokenRefreshData {
  user: IRefreshTokenUser;
  prototype: any[];
}

interface IRefreshTokenUser {
  refreshToken: IRefreshToken;
  prototype: any[];
}

export interface IRefreshToken {
  token: string;
  statusCode: number;
}

export interface ICreateUserQuery {
  data: { user: { create: ICreateUserResponce } };
  extensions: any[];
}

interface ICreateUserResponce {
  statusCode: number;
  errors: any[];
  user: IUserType;
}
