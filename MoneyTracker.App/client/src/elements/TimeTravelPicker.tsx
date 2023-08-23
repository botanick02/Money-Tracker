import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { SET_DATETIME } from "../store/TimeTravel/TimeTravel.slice";
import InputWrapper from "./InputWrapper";

const TimeTravelPicker = () => {
    const timeTravelDateTime = useAppSelector(state => state.TimeTravel.datetime)
    
    const [dateTime, setDateTime] = useState<null | string>(timeTravelDateTime);
  
    const dispatch = useAppDispatch();
 
    const handleTimeTravel = () => {
        dispatch(SET_DATETIME(dateTime))
    };

    const resetTimeTravel = () => {
        dispatch(SET_DATETIME(null))
    }
   
    return (
      <div className="time-travel-panel">
        <InputWrapper>
        <input 
          type="datetime-local"
          value={dateTime || ''}
          onChange={(e) => setDateTime(e.target.value)}
        />
        </InputWrapper>
        <button className="button" onClick={handleTimeTravel}>Time Travel</button>
        <button className="button" onClick={resetTimeTravel}>Reset Time Travel</button>
      </div>
    );
  };

export default TimeTravelPicker;
