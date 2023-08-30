import { from, map, mergeMap } from "rxjs";
import { Epic, combineEpics, ofType } from "redux-observable";
import {
  REFRESH_ACCESS_TOKEN,
  REFRESH_ACCESS_TOKEN_SUCCESS,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_IN_GOOGLE,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
  REFRESH_ACCESS_TOKEN_ERROR,
} from "./Auth.slice";
import { request } from "../../api/core";
import {
  Login,
  GoogleLogin,
  RefreshAccessToken,
  logOut,
  Register,
} from "../../api/queries/Auth";
import { store } from "../store";

export const SignInEpic: Epic<any, any, any> = (action$) => {
  return action$.pipe(
    ofType(SIGN_IN),
    mergeMap((action) =>
      from(request(Login, { loginCredentials: action.payload })).pipe(
        map((data: any) => {
          if (data.errors) {
            //   store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
            return SIGN_IN_ERROR(data.errors[0].message);
          } else {
            if (
              data.data.auth.login &&
              data.data.auth.login.accessToken !== ""
            ) {
              localStorage.setItem(
                "accessToken",
                data.data.auth.login.accessToken
              );
              return SIGN_IN_SUCCESS();
            }
          }
        })
      )
    )
  );
};

export const GoogleSignInEpic: Epic<any, any, any> = (action$: any) => {
  return action$.pipe(
    ofType(SIGN_IN_GOOGLE),
    mergeMap((action: any) =>
      from(request(GoogleLogin, { loginCredentials: action.payload })).pipe(
        map((data: any) => {
          if (data.errors) {
            // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
            return SIGN_IN_ERROR(data.errors[0].message);
          } else {
            if (
              data.data.auth.googleLogin &&
              data.data.auth.googleLogin.accessToken !== ""
            ) {
              localStorage.setItem(
                "accessToken",
                data.data.auth.googleLogin.accessToken
              );
              return SIGN_IN_SUCCESS();
            }
          }
        })
      )
    )
  );
};

export const RefreshAccessTokenEpic: Epic<any, any, any> = (action$) => {
  return action$.pipe(
    ofType(REFRESH_ACCESS_TOKEN),
    mergeMap(() =>
      from(request(RefreshAccessToken)).pipe(
        map((data: any) => {
          console.log(data)
          if (data.data.auth.refreshToken?.accessToken){
          
          localStorage.setItem(
            "accessToken",
            data.data.auth.refreshToken.accessToken
          );
          return REFRESH_ACCESS_TOKEN_SUCCESS();
        } else {
          localStorage.removeItem('accessToken');

        return REFRESH_ACCESS_TOKEN_ERROR();
        }
        })
      )
    )
  );
};

export const SignOutEpic: Epic<any, any, any> = (action$: any) => {
  return action$.pipe(
    ofType(SIGN_OUT),
    mergeMap(() =>
      from(request(logOut)).pipe(
        map((data: any) => {
          if (data.data.auth.logOut === true) {
            localStorage.clear();
            return SIGN_OUT_SUCCESS();
          } else {
            // store.dispatch(SHOW_ERROR_MESSAGE("Sign out error!"));
            return SIGN_OUT_ERROR("Sign out error, try again!");
          }
        })
      )
    )
  );
};

export const RegistrationEpic: Epic<any, any, any> = (action$: any) => {
  return action$.pipe(
    ofType(REGISTRATION),
    mergeMap((action: any) =>
      from(request(Register, { createUser: action.payload })).pipe(
        map((data: any) => {
          if (data.errors) {
            return REGISTRATION_ERROR(data.errors[0].extensions.code);
          } else {
            localStorage.setItem(
              "accessToken",
              data.data.auth.createUser.accessToken
            );
            store.dispatch(REGISTRATION_SUCCESS);
            store.dispatch(SIGN_IN_SUCCESS);
            return SIGN_IN_SUCCESS();
          }
        })
      )
    )
  );
};


export const AuthEpics = combineEpics(
  SignInEpic,
  GoogleSignInEpic,
  RegistrationEpic,
  RefreshAccessTokenEpic,
  SignOutEpic,
  
);


