import React, { useEffect, useState } from "react";
import Dropdown, { Option } from "../elements/Dropdown";
import TimeScopeInput from "../elements/TimeScopeInput";
import {
  getCurrentISODateValue,
  getCurrentISOMonthValue,
  getCurrentISOWeekValue,
} from "../tools/Dates/currentIsoDates";

import { useDispatch } from "react-redux";
import { getMondayDateOfWeek, getSundayDateOfWeek } from "../tools/Dates/datesFromTimeScopes";

interface TimeScopePanel {
  onRangeChange: (startDate: string | null, endDate: string | null) => void;
}

export enum TimeScopes {
  Daily,
  Weekly,
  Monthly,
  Yearly,
  All,
  Custom,
}

export interface TimeScopeInputsType {
  daily: string;
  weekly: string;
  monthly: string;
  yearly: string;
  custom: {
    from: string;
    to: string;
  };
}

const TimeScopePanel = ({ onRangeChange }: TimeScopePanel) => {
  const [currentTimeScope, setCurrentTimeScope] = useState(TimeScopes.Monthly);
  const [timeScopeInputs, setTimeScopeInputs] = useState<TimeScopeInputsType>({
    daily: getCurrentISODateValue(),
    weekly: getCurrentISOWeekValue(),
    monthly: getCurrentISOMonthValue(),
    yearly: new Date().getFullYear().toString(),
    custom: {
      from: "",
      to: "",
    },
  });

  const timeScopeOptions: Option[] = [];
  for (const value in TimeScopes) {
    if (isNaN(Number(value))) {
      timeScopeOptions.push({ label: value, value: value });
    }
  }

  const updateTimeScope = (option: Option) => {
    const timeScope = TimeScopes[option.value as keyof typeof TimeScopes];
    setCurrentTimeScope(timeScope);
  };

  const getStartAndEndDate = (timeScope: TimeScopes, timeScopeInputs: TimeScopeInputsType) => {
    switch (timeScope) {
      case TimeScopes.Daily:
        return {
          startDate: timeScopeInputs.daily + 'T00:00:00+0000',
          endDate: timeScopeInputs.daily + 'T23:59:59+0000',
        };
      case TimeScopes.Weekly:
        const weekNumber = Number(timeScopeInputs.weekly.split("-W")[1]);
        const yearNumber = Number(timeScopeInputs.weekly.split("-W")[0]);
        return {
          startDate: getMondayDateOfWeek(weekNumber, yearNumber).toISOString(),
          endDate: getSundayDateOfWeek(weekNumber, yearNumber).toISOString(),
        };
      case TimeScopes.Monthly:
        const year = timeScopeInputs.monthly.split("-")[0];
        const month = timeScopeInputs.monthly.split("-")[1];
        const lastDayOfMonth = new Date(Number(year), Number(month), 0).getDate();
        return {
          startDate: `${timeScopeInputs.monthly}-01T00:00:00+0000`,
          endDate: `${timeScopeInputs.monthly}-${lastDayOfMonth}T23:59:59+0000`,
        };
      case TimeScopes.Yearly:
        return {
          startDate: `${timeScopeInputs.yearly}-01-01T00:00:00+0000`,
          endDate: `${timeScopeInputs.yearly}-12-31T23:59:59+0000`,
        };
      case TimeScopes.Custom:
        return {
          startDate: timeScopeInputs.custom.from + 'T00:00:00+0000',
          endDate: timeScopeInputs.custom.to + 'T23:59:59+0000',
        };
      case TimeScopes.All:
      return {
        startDate: null,
        endDate: null,
      };
      default:
        return {
          startDate: null,
          endDate: null,
        };
    }
  };

  useEffect(() => {
    const { startDate, endDate } = getStartAndEndDate(currentTimeScope, timeScopeInputs);
    onRangeChange(startDate, endDate);
  }, [timeScopeInputs, currentTimeScope]);


  return (
    <div className={"time-scope-panel"}>
      <div className={"time-scope-panel__date-picker"}>
        <TimeScopeInput
          scope={currentTimeScope}
          values={timeScopeInputs}
          setValue={setTimeScopeInputs}
        />
      </div>
      <div className="time-scope-panel__scope-picker">
        <Dropdown selectHandler={updateTimeScope} options={timeScopeOptions} defaultOptionIndex={TimeScopes.Monthly}/>
      </div>
    </div>
  );
};

export default TimeScopePanel;
