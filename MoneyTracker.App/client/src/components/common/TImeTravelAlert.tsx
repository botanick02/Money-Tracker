import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { SHOW_TIME_TRAVEL_POPUP } from "../../store/TimeTravel/TimeTravel.slice";

const TimeTravelAlert = () => {
  const timeTravelValue = useAppSelector((store) => store.TimeTravel.datetime);

  const dispatch = useAppDispatch();

  return timeTravelValue ? (
    <div
      className={"time-travel-alert"}
      onClick={() => dispatch(SHOW_TIME_TRAVEL_POPUP(true))}
    >
      You are time traveling to {new Date(timeTravelValue).toLocaleString()}
    </div>
  ) : null;
};

export default TimeTravelAlert;
