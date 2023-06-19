import React, { FC } from "react";
import { TimeScopes } from "../../components/TimeScopePanel/TimeScopePanel";

const TimeScopeInput: FC<{ scope: TimeScopes }> = ({ scope }) => {
  const renderInput = () => {
    switch (scope) {
      case TimeScopes.Daily:
        return <input type="date" />;
      case TimeScopes.Weekly:
        return <input type="week" />;
      case TimeScopes.Monthly:
        return <input type="month" />;
      case TimeScopes.Yearly:
        return (
          <input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            step="1"
            placeholder={new Date().getFullYear().toString()}
          />
        );
      case TimeScopes.All:
        return <></>;
      case TimeScopes.Custom:
        return (
          <>
            <input type="date" />
            <input type="date" />
          </>
        );
    }
  };

  return renderInput();
};

export default TimeScopeInput;
