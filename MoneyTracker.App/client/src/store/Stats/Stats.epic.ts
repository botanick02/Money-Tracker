import { Epic, combineEpics, ofType } from "redux-observable";
import { from, mergeMap } from "rxjs";
import { request } from "../../api/core";
import { Stats } from "../../types/Stats";
import {
  FETCH_STATS,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_ERROR,
  FetchStatsVariables,
} from "./Stats.slice";
import { GetStats } from "../../api/queries/Stats";



export const GetStatsEpics: Epic<any, any, any> = (action$, state$) => {
  return action$.pipe(
    ofType(FETCH_STATS),
    mergeMap(() =>
      from(request(GetStats,{
        input: {
          accountId: state$.value.Account.currentAccountId !== "total" ? state$.value.Account.currentAccountId : null,
          fromDate: state$.value.FinancialOperation.dateRange.fromDate,
          toDate: state$.value.FinancialOperation.dateRange.toDate,
        } as FetchStatsVariables
      })).pipe(
        mergeMap((data: any) => {
          if (data.errors) {
            return [FETCH_STATS_ERROR(data.errors[0].message)];
          } else {
            const { negativeTransactions, positiveTransactions } = data.data.statistics;
            const negativeStatsWithColor = negativeTransactions.map((stat: Stats) => ({
              ...stat
            }));
            const positiveStatsWithColor = positiveTransactions.map((stat: Stats) => ({
              ...stat
            }));

            return [
              FETCH_STATS_SUCCESS({
                stats: [...negativeStatsWithColor, ...positiveStatsWithColor],
              }),
            ];
          }
        })
      )
    )
  );
};

export const StatsEpics = combineEpics(GetStatsEpics);
