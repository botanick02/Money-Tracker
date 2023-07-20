import { Epic, combineEpics, ofType } from "redux-observable";
import { from, mergeMap } from "rxjs";
import { request } from "../../api/core";
import { Category } from "../../types/Category";
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
  EDIT_CATEGORY,
  EDIT_CATEGORY_ERROR,
  EDIT_CATEGORY_SUCCESS,
} from "./Categories.slice";
import { GetCategories } from "../../api/queries/Categories";

export const GetCategoriesEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(FETCH_CATEGORIES),
    mergeMap((action) =>
      from(request(GetCategories, action.payload)).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [FETCH_CATEGORIES_ERROR(data.errors[0].message)];
              } else {
                const categories = data.data.category.getCategories as Category[];
                return [
                  FETCH_CATEGORIES_SUCCESS({
                    categories,
                  }),
                ];
              }
            })
          )
        )
      )
    )
  );
};

export const EditCategoryEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(EDIT_CATEGORY),
    mergeMap((action) => from(request(GetCategories, action.payload)).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [EDIT_CATEGORY_ERROR(data.errors[0].message)];
              } else {
                return [EDIT_CATEGORY_SUCCESS({ editSuccess: true })];
              }
            })
          )
        )
      )
    )
  );
};

export const CategoriesEpics = combineEpics(
  GetCategoriesEpic,
  EditCategoryEpic
)