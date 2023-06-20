import React, { useState } from "react";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import TimeScopeInput from "../../elements/TimeScopePanel/TimeScopeInput";
import {
  getCurrentISODateValue,
  getCurrentISOMonthValue,
  getCurrentISOWeekValue,
} from "../../tools/Dates/currentIsoDates";

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
    setCurrentTimeScope(TimeScopes[option.value as keyof typeof TimeScopes]);
  };

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
