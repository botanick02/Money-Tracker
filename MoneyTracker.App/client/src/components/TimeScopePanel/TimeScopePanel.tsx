import React from "react";
import Dropdown from "../../elements/Dropdown/Dropdown";

const DatePeriodPanel = () => {
  const timeScopeOptions = [
    new Option("Montly"),
    new Option("Weekly", "Weekly"),
    new Option("Daily", "Daily"),
    new Option("Custom", "Custom"),
  ];

  return (
    <div className={"time-scope-panel"}>
      <div className={"time-scope-panel__date-picker"}>&lt; June 2023 &gt;</div>
      <Dropdown selectHandler={() => {}} options={timeScopeOptions} />
    </div>
  );
};

export default DatePeriodPanel;
