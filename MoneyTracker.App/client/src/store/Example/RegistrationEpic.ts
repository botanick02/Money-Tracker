import { Epic, ofType } from "redux-observable";
import { filter, from, map, mergeMap } from "rxjs";
import { store } from "../store";
import { UserReducer } from "./Reducers/UserReducer";
import { NotificationReducer } from "./Reducers/NotificationReducer";
import { RefreshTokenReducer } from "./Reducers/RefreshTokenReducer";
import { GraphQlEndpoint } from "../../api/queries/tmp";
import { RegistrationReducer } from "./Reducers/RegistrationReducer";
import { AuthorizationReducer } from "./Reducers/AuthorizationReducer";
const { GET_USER_INFO } = UserReducer.actions;
const { SIGN_IN_SUCCESS} =
  AuthorizationReducer.actions;
const { SHOW_ERROR_MESSAGE } = NotificationReducer.actions;
const {
    REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
   
  } = RegistrationReducer.actions;
export const RegistrationEpic: Epic<any, any, any> = (action$: any) => {
    let payload: { username: string; password: string; email: string};
   
    const registrationQuery = (username: string, password: string, email: string) => {
        return `
        mutation register{
            auth{
            createUser(
                createUser: { name: "Stepan", email: "${email}", password: "${password}"}
            ){
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
                    body: JSON.stringify({ query: registrationQuery(payload.username!, payload.password!,payload.email!) }),
                })
            ).pipe(
                mergeMap((response) =>
                    from(response.json()).pipe(
                        map((data: any) => {
                          
                            if (data.errors) {
                                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].extensions.code)); 
                                return REGISTRATION_ERROR(data.errors[0].extensions.code);
                              } else {
                              
if (data.data.auth.createUser.accessToken && data.data.auth.createUser.accessToken !== '') {
  
    localStorage.setItem('accessToken', data.data.auth.createUser.accessToken);
    store.dispatch(REGISTRATION_SUCCESS)
    store.dispatch(SIGN_IN_SUCCESS)
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

