import {Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {fetchBudgetAction} from "./Budgets.slice";

console.log("")

// const budgetEpic: Epic = (action$: Observable<ReturnType<typeof fetchBudgetAction>>) => {
//     return action$.pipe(
//         ofType(fetchBudgetAction.type),
//         mergeMap(action => from().pipe(
//             map(response => {
//                 console.log(response)
//                 if (response
//                     && response.data.authMutation.auth_login
//                     && response.data.authMutation.auth_login.accessToken
//                     && response.data.authMutation.auth_login.refreshToken
//                     && !response.errors) {
//                     setCookie({
//                         key: refreshTokenKey,
//                         value: response.data.authMutation.auth_login.refreshToken,
//                         lifetime: 30 * 24 * 60 * 60
//                     });
//                     setCookie({
//                         key: accessTokenKey,
//                         value: response.data.authMutation.auth_login.accessToken,
//                         lifetime: 2 * 60
//                     });
//                     const userId = parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId;
//                     store.dispatch(authorizeUser(userId))
//                     return {payload: response, type: "AuthLoginSuccess"} as Action;
//                 } else if (response?.errors) {
//                     store.dispatch(setError(parseError(response.errors[0].message)));
//                     return {payload: response, type: "AuthLoginError"} as Action
//                 }
//                 return {payload: response, type: "AuthLoginError"} as Action
//             })
//         ))
//     )
// }