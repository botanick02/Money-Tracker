import React, { useState } from "react";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import TimeScopeInput from "../../elements/TimeScopePanel/TimeScopeInput";

const TimeScopePanel = () => {
  const timeScopeOptions: Option[] = [
    {
      label: "Daily",
      value: "Daily",
    },
    {
      label: "Monthly",
      value: "Monthly",
    },
    {
      label: "Yearly",
      value: "Yearly",
    },
    {
      label: "All",
      value: "All",
    },
    {
      label: "Custom",
      value: "Custom",
    },
  ];

  const [currentTimeScope, setCurrentTimeScope] = useState(timeScopeOptions[0].value);

  return (
    <div className={"time-scope-panel"}>
      <div className={"time-scope-panel__date-picker"}>
        <TimeScopeInput/>
        {/* &lt; June 2023 &gt; */}
        </div>
      <div className="time-scope-panel__scope-picker">
        <Dropdown selectHandler={() => {}} options={timeScopeOptions} />
      </div>
    </div>
  );
};

export default TimeScopePanel;
