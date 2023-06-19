import React, { useState } from "react";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import TimeScopeInput from "../../elements/TimeScopePanel/TimeScopeInput";

export enum TimeScopes {
  Daily,
  Weekly,
  Monthly,
  Yearly,
  All,
  Custom,
}

const TimeScopePanel = () => {
  const timeScopeOptions: Option[] = [];

  for (const value in TimeScopes) {
    if (isNaN(Number(value))) {
      timeScopeOptions.push({ label: value, value: value});
    }
  }

  const [currentTimeScope, setCurrentTimeScope] = useState(
    TimeScopes.Daily
  );

  const updateTImeScope = (option: Option) => {
    setCurrentTimeScope(TimeScopes[option.value as keyof typeof TimeScopes])
  }

  return (
    <div className={"time-scope-panel"}>
      <div className={"time-scope-panel__date-picker"}>
        <TimeScopeInput scope={currentTimeScope}/>
        {/* &lt; June 2023 &gt; */}
      </div>
      <div className="time-scope-panel__scope-picker">
        <Dropdown selectHandler={updateTImeScope} options={timeScopeOptions} />
      </div>
    </div>
  );
};

export default TimeScopePanel;
