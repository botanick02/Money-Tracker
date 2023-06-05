import { Epic, ofType } from "redux-observable";
import { filter, from, map, mergeMap } from "rxjs";



import { store } from "../store";

import { AnyAction } from "redux";

import { IUserQuery } from "../../types/GraphQLType";
import { AuthorizationReducer } from "./Reducers/AuthorizationReducer";
import { UserReducer } from "./Reducers/UserReducer";
import { NotificationReducer } from "./Reducers/NotificationReducer";
import { RefreshTokenReducer } from "./Reducers/RefreshTokenReducer";
import { GraphQlEndpoint } from "../../api/queries/tmp";
const { GET_USER_INFO } = UserReducer.actions;
const { SHOW_ERROR_MESSAGE } = NotificationReducer.actions;
const {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_OUT,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_ERROR
  } = AuthorizationReducer.actions;
export const AuthorizationEpic: Epic<any, any, any> = (action$: any) => {
    let payload: { username: string; password: string };
   
    const authQuery = (username: string, password: string) => {
        return `
        mutation login{
            auth{
            login(loginCredentials: { email: "${username}", password: "${password}"}){
              
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
                    body: JSON.stringify({ query: authQuery(payload.username!, payload.password!) }),
                })
            ).pipe(
                mergeMap((response) =>
                    from(response.json()).pipe(
                        map((data: IUserQuery) => {
                            console.log(data)
                            if (data.data.auth.login.accessToken !== '') {
                                localStorage.setItem('accessToken', data.data.auth.login.accessToken);
                                return SIGN_IN_SUCCESS();
                              }else {
                                store.dispatch(SHOW_ERROR_MESSAGE("Incorrect username or password!"));
                                return SIGN_IN_ERROR("Incorrect username or password!");
                            }
                        })
                    )
                )
            )
        )
    );
};

export const GetAccessTokenEpic: Epic<any, any, any> = (action$) => {
    const { GET_ACCESS_TOKEN, GET_ACCESS_TOKEN_ERROR, GET_ACCESS_TOKEN_SUCCESS } = RefreshTokenReducer.actions;
    const { SIGN_IN_ERROR, SIGN_IN_SUCCESS } = AuthorizationReducer.actions;

    let actionPayload: any;

    const GetTokenQuery = `
            mutation{
              authorization{
                refreshToken{
                  statusCode
                  token
                  refreshToken
                  errors
                }
              }
            }
        `;

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
                            let result = data.data.authorization.refreshToken;
                            if (result.statusCode == 401) {
                                localStorage.removeItem("accessToken");
                                return GET_ACCESS_TOKEN_ERROR();
                            } else {
                                localStorage.setItem("accessToken", result.token);
                                if (actionPayload != undefined) {
                                    actionPayload.nextActions.forEach((action: AnyAction) => {
                                        store.dispatch(action);
                                    });
                                }
                                return GET_ACCESS_TOKEN_SUCCESS();
                            }
                        })
                    )
                )
            )
        )
    );
};

export const SignOutEpic: Epic<any, any, any> = (action$: any) => {

    return action$.pipe(
        ofType(SIGN_OUT),
        map(() => {
          localStorage.clear();
          return SIGN_OUT_SUCCESS();
        })
      );
};