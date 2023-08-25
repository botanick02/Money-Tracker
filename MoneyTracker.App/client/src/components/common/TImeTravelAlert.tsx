import { useAppSelector } from "../../hooks/useAppDispatch";

const TimeTravelAlert = () => {
  const timeTravelValue = useAppSelector((store) => store.TimeTravel.datetime);

  return timeTravelValue ? <div className={"time-travel-alert"}>
    You are time traveling to {new Date(timeTravelValue).toLocaleString()}
  </div> : null;
};

export default TimeTravelAlert;
