import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {fetch_example, fetchExampleAction} from "./Example.slice";
import {request} from "../../api/core";

const fetchExampleEpic: Epic = ($action: Observable<ReturnType<typeof fetchExampleAction>>) => {
    return $action.pipe(
        ofType(fetchExampleAction.type),
        mergeMap(() => from(request()).pipe(
            map(response => {
                try {
                    return fetch_example(response.data);
                } catch (e) {
                    console.error(e)
                }
            })
        ))
    )
}

export const exampleEpics = combineEpics(fetchExampleEpic)