import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addFastingTime,
  setTotalHours,
} from "../store/slices/fastingListSlice";

interface FastingTimeContextType {
  elapsedTime: number;
  //@ts-expect-error: typechecking is disabled for this line
  setElapsedTime: (time) => void;
  elapsedTimeInSeconds: number;
  //@ts-expect-error: typechecking is disabled for this line
  setElapsedTimeInSeconds: (time) => void;
  hours: string;
  setHours: (time: string) => void;
  minutes: string;
  setMinutes: (time: string) => void;
  seconds: string;
  setSeconds: (time: string) => void;
  totalFastingTimeInSeconds: number;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
}

// Create the context with a default value
const FastingTimeContext = createContext<FastingTimeContextType>({
  elapsedTime: 0,
  setElapsedTime: () => {},
  hours: "08",
  setHours: () => {},
  minutes: "00",
  setMinutes: () => {},
  seconds: "00",
  setSeconds: () => {},
  totalFastingTimeInSeconds: 0,
  elapsedTimeInSeconds: 0,
  setElapsedTimeInSeconds: () => {},
  startTime: "08:00",
  setStartTime: () => {},
  endTime: "16:00",
  setEndTime: () => {},
});

export const useFastingTime = () => useContext(FastingTimeContext);

// This component will wrap around the parts of your app that need the fasting time data
export const FastingTimeProvider = ({ children }: { children: ReactNode }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
  const [hours, setHours] = useState("08");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("00:00");

  const fastingState = useAppSelector((state) => state.fastingState.state);
  const dispatch = useAppDispatch();

  const totalFastingTimeInSeconds =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  useEffect(() => {
    if (fastingState === "completed") {
      dispatch(
        addFastingTime({
          fastingTime: {
            id: new Date().getTime().toString(),
            duration: `${hours}:${minutes}:${seconds}`,
            startTime,
            endTime,
            timestamp: new Date().toLocaleString(),
          },
        })
      );

      const totalHours = parseInt(hours);
      dispatch(setTotalHours(totalHours));
    }
  }, [fastingState, hours, minutes, seconds, startTime, endTime, dispatch]);

  return (
    <FastingTimeContext.Provider
      value={{
        elapsedTime,
        setElapsedTime,
        hours,
        minutes,
        seconds,
        setHours,
        setMinutes,
        setSeconds,
        totalFastingTimeInSeconds,
        elapsedTimeInSeconds,
        setElapsedTimeInSeconds,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
      }}
    >
      {children}
    </FastingTimeContext.Provider>
  );
};
