import React from "react";
import {
  TimeScopeInputsType,
  TimeScopes,
} from "../components/TimeScopePanel";

interface TimeScopeInputProps {
  scope: TimeScopes;
  values: TimeScopeInputsType;
  setValue: (value: any) => void;
}

const TimeScopeInput = ({ scope, values, setValue }: TimeScopeInputProps) => {
  function renderInput() {
    switch (scope) {
      case TimeScopes.Daily:
        return (
          <input
            type="date"
            value={values.daily}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const updatedValues = { ...values, daily: event.target.value };
              setValue(updatedValues);
            }}
          />
        );
      case TimeScopes.Weekly:
        return (
          <input
            type="week"
            value={values.weekly}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const updatedValues = { ...values, weekly: event.target.value };
              setValue(updatedValues);
            }}
          />
        );
      case TimeScopes.Monthly:
        return (
          <input
            type="month"
            value={values.monthly}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const updatedValues = { ...values, monthly: event.target.value };
              setValue(updatedValues);
            }}
          />
        );
      case TimeScopes.Yearly:
        return (
          <input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            step="1"
            placeholder={new Date().getFullYear().toString()}
            value={values.yearly}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const updatedValues = { ...values, yearly: event.target.value };
              setValue(updatedValues);
            }}
          />
        );
      case TimeScopes.All:
        return null;
      case TimeScopes.Custom:
        return (
          <>
            From: <input
              type="date"
              value={values.custom.from}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const updatedValues = {
                  ...values,
                  custom: { ...values.custom, from: event.target.value },
                };
                setValue(updatedValues);
              }}
            />
            <br/>
            To: <input
              type="date"
              value={values.custom.to}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const updatedValues = {
                  ...values,
                  custom: { ...values.custom, to: event.target.value },
                };
                setValue(updatedValues);
              }}
            />
          </>
        );
    }
  }

  return renderInput();
};

export default TimeScopeInput;
