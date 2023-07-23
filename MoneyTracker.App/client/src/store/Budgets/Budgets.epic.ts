import {Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {fetchBudgetAction} from "./Budgets.slice";
import {request} from "../../api/core";
import {GetBudgets} from "../../api/queries/Budgets";

console.log("")

const budgetEpic: Epic = (action$: Observable<ReturnType<typeof fetchBudgetAction>>) => {
    return action$.pipe(
        ofType(fetchBudgetAction.type),
        mergeMap(action => from(request(GetBudgets)).pipe(
            map(response => {
                console.log(response)
                return {payload: response, type: "AuthLoginError"}
            })
        ))
    )
}