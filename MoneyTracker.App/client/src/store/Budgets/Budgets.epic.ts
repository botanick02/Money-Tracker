import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {fetch_budget, fetchBudgetAction} from "./Budgets.slice";
import {request} from "../../api/core";
import {GetBudgets} from "../../api/queries/Budgets";


const GetBudgetsEpic: Epic = (action$: Observable<ReturnType<typeof fetchBudgetAction>>) => {
    return action$.pipe(
        ofType(fetchBudgetAction.type),
        mergeMap(action => from(request(GetBudgets)).pipe(
            map(response => {
                console.log(response)
                return fetch_budget(response.data.budget.getBudgets)
            })
        ))
    )
}

export const BudgetEpics = combineEpics(GetBudgetsEpic)