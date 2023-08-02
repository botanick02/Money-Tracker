import { Epic, combineEpics, ofType } from "redux-observable";
import { from, mergeMap } from "rxjs";
import { request } from "../../api/core";
import { Stats } from "../../types/Stats";
import {
  FETCH_STATS,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_ERROR,
} from "./Stats.slice";
import { GetStats } from "../../api/queries/Stats";

export const GetStatsEpics: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(FETCH_STATS),
    mergeMap(() =>
      from(request(GetStats)).pipe(
        mergeMap(((data: any) => {
              if (data.errors) {
                // store.dispatch(SHOW_ERROR_MESSAGE(data.errors[0].message));
                return [FETCH_STATS_ERROR(data.errors[0].message)];
              } else {
                const stats = data.data.statistics.getStatistics as Stats[];
                console.log(stats)
                return [
                  FETCH_STATS_SUCCESS({
                    stats,
                  }),
                ];
              }
            })
          )
        )
      )
    )
};



export const StatsEpics = combineEpics(
  GetStatsEpics
)