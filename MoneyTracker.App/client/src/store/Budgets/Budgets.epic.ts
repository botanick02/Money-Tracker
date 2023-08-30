import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {
  createBudgetAction,
  deleteBudgetAction,
  editBudgetAction,
  fetch_budget,
  fetchBudgetAction
} from "./Budgets.slice";
import {request} from "../../api/core";
import {CreateBudget, DeleteBudget, EditBudget, GetBudgets} from "../../api/queries/Budgets";


const GetBudgetsEpic: Epic = (action$: Observable<ReturnType<typeof fetchBudgetAction>>) => {
    return action$.pipe(
        ofType(fetchBudgetAction.type),
        mergeMap(() => from(request(GetBudgets)).pipe(
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
        mergeMap(action => from(request(EditBudget, {budget: action.payload})).pipe(
            map(response => {
                if (response.data.budget.editBudget){
                    return fetchBudgetAction("")
                }
            })
        ))
    )
}

const CreateBudgetsEpic: Epic = (action$: Observable<ReturnType<typeof createBudgetAction>>) => {
    return action$.pipe(
        ofType(createBudgetAction.type),
        mergeMap(action => from(request(CreateBudget, {budget: action.payload})).pipe(
            map(response => {
                if (response.data.budget.createBudget){
                    return fetchBudgetAction("")
                }
            })
        ))
    )
}

const DeleteBudgetsEpic: Epic = (action$: Observable<ReturnType<typeof deleteBudgetAction>>) => {
    return action$.pipe(
        ofType(deleteBudgetAction.type),
        mergeMap(action => from(request(DeleteBudget, {id: action.payload})).pipe(
            map(response => {
                if (response.data.budget.deleteBudget){
                    return fetchBudgetAction("")
                }
            })
        ))
    )
}

export const BudgetEpics = combineEpics(GetBudgetsEpic, EditBudgetsEpic, CreateBudgetsEpic, DeleteBudgetsEpic)