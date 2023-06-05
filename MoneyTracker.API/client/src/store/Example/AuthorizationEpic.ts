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
    let payload: { email: string; password: string };
    const authQuery = (email: string, password: string) => {
        return `
        mutation auth{
            auth{
            login(loginCredentials: { email: "${email}", password: "${password}"}){
              statusCode
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
                    body: JSON.stringify({ query: authQuery(payload.email!, payload.password!) }),
                })
            ).pipe(
                mergeMap((response) =>
                    from(response.json()).pipe(
                        map((data: IUserQuery) => {
                            if (data.data.authorization.login.statusCode == 200) {
                                localStorage.setItem("accessToken", data.data.authorization.login.token);
                                return SIGN_IN_SUCCESS();
                            } else {
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
    const signOutQuery = `
            mutation signOut{
              authorization{
                signOut{
                  statusCode
                  errors
                }
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
                            if (data.data.authorization.signOut.statusCode == 200) {
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