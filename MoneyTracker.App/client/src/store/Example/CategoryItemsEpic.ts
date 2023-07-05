import { Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { store } from "../store";
import { NotificationReducer } from "./Reducers/NotificationReducer";
import { GraphQlEndpoint } from "../../api/queries/tmp";

import { CategoryItemReducer } from "./Reducers/CategoryItemsReducer";
import { ICategoryType } from "../../types/ICategoryType";

const { SHOW_ERROR_MESSAGE } = NotificationReducer.actions;
const { FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_ERROR } =
  CategoryItemReducer.actions;

export const CategoryItemsEpic: Epic<any, any, any> = (action$, state$) => {
  const categoryQuery = () => {
    return `query {
      category {
        getCategories {
          id
          name
          type
          isActive
        }
      }
    }`;
  };

  return action$.pipe(
    ofType(FETCH_CATEGORIES),
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
          body: JSON.stringify({
            query: categoryQuery(),
          }),
        })
      ).pipe(
        mergeMap((response) =>
          from(response.json()).pipe(
            mergeMap((data: any) => {
              console.log(data);
              if (data.errors) {
                store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [FETCH_CATEGORIES_ERROR(data.errors[0].message)];
              } else {
                const items = data.data.category.getCategories;
                const newItems: ICategoryType[] = items.map((item: ICategoryType) => ({
                  name: item.name,
                  type: item.type,
                  id: item.id,
                  isActive: item.isActive,
                }));
                console.log(newItems);
                return [
                  FETCH_CATEGORIES_SUCCESS({
                    categories: items
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
