import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable, of} from "rxjs";
import {editBudgetAction, fetch_budget, fetchBudgetAction} from "./Budgets.slice";
import {request} from "../../api/core";
import {EditBudget, GetBudgets} from "../../api/queries/Budgets";


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

const EditBudgetsEpic: Epic = (action$: Observable<ReturnType<typeof editBudgetAction>>) => {
    return action$.pipe(
        ofType(editBudgetAction.type),
        mergeMap(action => from(request(EditBudget, {budget: {...action.payload, isActive: true}})).pipe(
            map(response => {
                if (response.data.budget.editBudget){
                    return fetchBudgetAction("")
                }
            })
        ))
    )
}

export const BudgetEpics = combineEpics(GetBudgetsEpic, EditBudgetsEpic)