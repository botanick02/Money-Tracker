import { Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { store } from "../store";
import { AuthorizationReducer } from "./Reducers/AuthorizationReducer";
import { NotificationReducer } from "./Reducers/NotificationReducer";
import { RefreshTokenReducer } from "./Reducers/RefreshTokenReducer";
import { GraphQlEndpoint } from "../../api/queries/tmp";
import { IGoogleLoginQuery, ILoginQuery } from "../../types/GraphQLType";
const { SHOW_ERROR_MESSAGE } = NotificationReducer.actions;
const {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_IN_GOOGLE,
} = AuthorizationReducer.actions;

export const AuthorizationEpic: Epic<any, any, any> = (action$: any) => {
  let payload: { email: string; password: string };

  const authQuery = (email: string, password: string) => {
    return `
        mutation login{
            auth{
            login(loginCredentials: { email: "${email}", password: "${password}"}){
              
              accessToken
            }
          }
        }
        `;
  };

  return action$.pipe(
    ofType(SIGN_IN),
    map((item: any) => {
      payload = item.payload;
    }),
    mergeMap(() =>
      from(
        fetch(GraphQlEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: authQuery(payload.email!, payload.password!),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            
            map((data: ILoginQuery) => {
           
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
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
      )
    )
  );
};

export const GoogleAuthorizationEpic: Epic<any, any, any> = (action$: any) => {
  let payload: { token: string };

  const authQuery = (token: string) => {
    return `
        mutation login{
            auth{
              googleLogin(loginCredentials: { token: "${token}"}){
              accessToken
            }
          }
        }
        `;
  };

  return action$.pipe(
    ofType(SIGN_IN_GOOGLE),
    map((item: any) => {
      payload = item.payload;
    }),
    mergeMap(() =>
      from(
        fetch(GraphQlEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: authQuery(payload.token),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            map((data: IGoogleLoginQuery) => {
            
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
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
      )
    )
  );
};

export const GetAccessTokenEpic: Epic<any, any, any> = (action$) => {
  const { GET_ACCESS_TOKEN, GET_ACCESS_TOKEN_SUCCESS } =
    RefreshTokenReducer.actions;

  let actionPayload: any;

  const GetTokenQuery = `
    mutation refresh{
        auth{
          refreshToken{
            accessToken
          }
        }
      }`;

  return action$.pipe(
    ofType(GET_ACCESS_TOKEN),
    map((action$) => {
      actionPayload = action$.payload;
    }),
    mergeMap(() =>
      from(
        fetch(GraphQlEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query: GetTokenQuery }),
        })
      ).pipe(
        mergeMap((responce) =>
          from(responce.json()).pipe(
            map((data: any) => {
         
              localStorage.setItem(
                "accessToken",
                data.data.auth.refreshToken.accessToken
              );
              return GET_ACCESS_TOKEN_SUCCESS();
            })
          )
        )
      )
    )
  );
};

export const SignOutEpic: Epic<any, any, any> = (action$: any) => {
  const signOutQuery = `
    mutation  logOut {
      auth {
        logOut
      }
    }
    
            `;

  return action$.pipe(
    ofType(SIGN_OUT),
    mergeMap(() =>
      from(
        fetch(GraphQlEndpoint, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: JSON.stringify({ query: signOutQuery }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            map((data) => {
           
              if (data.data.auth.logOut == true) {
                localStorage.clear();
                return SIGN_OUT_SUCCESS();
              } else {
                store.dispatch(SHOW_ERROR_MESSAGE("Sign out error!"));
                return SIGN_OUT_ERROR("Sign out error, try again!");
              }
            })
          )
        )
      )
    )
  );
};
