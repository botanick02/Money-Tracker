import { Epic, ofType } from "redux-observable";
import { filter, from, map, mergeMap } from "rxjs";
import { store } from "../store";
import { IUserQuery } from "../../types/GraphQLType";

import { UserReducer } from "./Reducers/UserReducer";
import { NotificationReducer } from "./Reducers/NotificationReducer";
import { RefreshTokenReducer } from "./Reducers/RefreshTokenReducer";
import { GraphQlEndpoint } from "../../api/queries/tmp";
import { RegistrationReducer } from "./Reducers/RegistrationReducer";
const { GET_USER_INFO } = UserReducer.actions;
const { SHOW_ERROR_MESSAGE } = NotificationReducer.actions;
const {
    REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
   
  } = RegistrationReducer.actions;
export const RegistrationEpic: Epic<any, any, any> = (action$: any) => {
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
        ofType(REGISTRATION),
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
                                return REGISTRATION_SUCCESS();
                              }else {
                                store.dispatch(SHOW_ERROR_MESSAGE("Incorrect username or password!"));
                                return REGISTRATION_ERROR("Incorrect username or password!");
                            }
                        })
                    )
                )
            )
        )
    );
};

