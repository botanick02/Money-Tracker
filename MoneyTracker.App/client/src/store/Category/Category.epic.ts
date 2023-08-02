import {Epic, combineEpics, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {request} from "../../api/core";
import {Category} from "../../types/Category";
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
  EDIT_CATEGORY,
  EDIT_CATEGORY_ERROR,
  EDIT_CATEGORY_SUCCESS, createCategory, deleteCategory,
} from "./Category.slice";
import {CreateCategory, DeleteCategory, EditCategory, GetCategories} from "../../api/queries/Categories";

export const GetCategoriesEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(FETCH_CATEGORIES),
    mergeMap(() =>
      from(request(GetCategories)).pipe(
        mergeMap(((data: any) => {
            if (data.errors) {
              // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
              return [FETCH_CATEGORIES_ERROR(data.errors[0].message)];
            }

            const categories = data.data.category.getCategories as Category[];
            return [
              FETCH_CATEGORIES_SUCCESS({
                categories,
              }),
            ];
          })
        )
      )
    )
  )
};

export const EditCategoryEpic: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(EDIT_CATEGORY),
    mergeMap((action) => from(request(EditCategory, action.payload)).pipe(
      mergeMap((data: any) => {
        if (data.errors) {
          // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
          return [EDIT_CATEGORY_ERROR(data.errors[0].message)];
        } else {
          return [EDIT_CATEGORY_SUCCESS({editSuccess: true})];
        }
      })
      )
    )
  )
};

const CreateCategoryEpic: Epic = (action$: Observable<ReturnType<typeof createCategory>>) => {
  return action$.pipe(
    ofType(createCategory.type),
    mergeMap(action => from(request(CreateCategory, {category: action.payload})).pipe(
      map(response => {
        if (response.data.category){
          return FETCH_CATEGORIES()
        }
      })
    ))
  )
}

const DeleteCategoryEpic: Epic = (action$: Observable<ReturnType<typeof deleteCategory>>) => {
  return action$.pipe(
    ofType(deleteCategory.type),
    mergeMap(action => from(request(DeleteCategory, {id: action.payload})).pipe(
      map(response => {
        if (response.data.category){
          return FETCH_CATEGORIES()
        }
      })
    ))
  )
}

export const CategoriesEpics = combineEpics(
  GetCategoriesEpic,
  EditCategoryEpic,
  CreateCategoryEpic,
  DeleteCategoryEpic
)