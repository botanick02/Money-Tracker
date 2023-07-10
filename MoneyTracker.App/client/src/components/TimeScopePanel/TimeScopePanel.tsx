import React, { useEffect, useState } from "react";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import TimeScopeInput from "../../elements/TimeScopePanel/TimeScopeInput";
import {
  getCurrentISODateValue,
  getCurrentISOMonthValue,
  getCurrentISOWeekValue,
} from "../../tools/Dates/currentIsoDates";

import { useDispatch } from "react-redux";
import { SET_DATE_TIME } from "../../store/Example/Reducers/DateTimeReducer";
import { useAppSelector } from "../../hooks/useAppDispatch";


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

const TimeScopePanel = () => {
  const dispatch = useDispatch();

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

  const [currentTimeScope, setCurrentTimeScope] = useState(TimeScopes.Daily);

  const updateTImeScope = (option: Option) => {
    const timeScope = TimeScopes[option.value as keyof typeof TimeScopes];
    setCurrentTimeScope(timeScope);


    dispatch(SET_DATE_TIME(timeScopeInputs.daily+`T00:00:30`));
  };
  useEffect(() => {
    dispatch(SET_DATE_TIME(timeScopeInputs.daily+`T00:00:30`));
    
  }, [timeScopeInputs]);


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
        <Dropdown selectHandler={updateTImeScope} options={timeScopeOptions} />
      </div>
    </div>
  );
};

export default TimeScopePanel;
