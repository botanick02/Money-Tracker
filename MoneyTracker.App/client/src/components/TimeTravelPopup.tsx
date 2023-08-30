import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import {
  SET_DATETIME,
  SHOW_TIME_TRAVEL_POPUP,
} from "../store/TimeTravel/TimeTravel.slice";
import InputWrapper from "../elements/InputWrapper";
import { useNavigate } from "react-router-dom";

const TimeTravelPopup = () => {
  const timeTravelDateTime = useAppSelector(
    (state) => state.TimeTravel.datetime
  );

  const showPopupState = useAppSelector((state) => state.TimeTravel.showPopup);

  const [dateTime, setDateTime] = useState<null | string>(timeTravelDateTime);

  const dispatch = useAppDispatch();

  const closePopupHandle = () => {
    dispatch(SHOW_TIME_TRAVEL_POPUP(false));
  };

  const resetTimeTravel = () => {
    dispatch(SET_DATETIME(null));
    closePopupHandle();
  };

  const timeTravel = () => {
    if (dateTime) {
      dispatch(SET_DATETIME(dateTime));
      closePopupHandle();
    }
  };

  const navigate = useNavigate();

  return showPopupState ? (
    <div
      className={"popup-bg"}
      onClick={(event) => {
        event.stopPropagation();
        closePopupHandle();
      }}
    >
      <div className={"popup"} onClick={(event) => event.stopPropagation()}>
        <div className={`popup__header title-single`}>Time Travel</div>
        <div className={"popup__fields"}>
          <InputWrapper>
            <input
              type="datetime-local"
              value={dateTime || ""}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </InputWrapper>
          <button
            className="button"
            onClick={() => {
              timeTravel();
              navigate("/");
            }}
          >
            Time Travel
          </button>
        </div>
        <div className={"popup__row"}>
          <button className="button" onClick={resetTimeTravel}>
            Reset
          </button>
          <button className="button" onClick={closePopupHandle}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TimeTravelPopup;
