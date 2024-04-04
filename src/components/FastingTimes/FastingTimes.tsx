import { ChangeEvent, useEffect } from "react";
import { TimeInput } from "../TimeInput/TimeInput";
import styles from "./FastingTimes.module.scss";
import { useFastingTime } from "../../contexts/FastingTimeContext";

const FastingTimes = () => {
  const {
    totalFastingTimeInSeconds,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useFastingTime();

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  useEffect(() => {
    if (!startTime) return;
    const calculateEndTime = (startTime: string) => {
      const [hours, minutes] = startTime
        .split(":")
        .map((time) => parseInt(time));

      const totalMinutes =
        hours * 60 + minutes + totalFastingTimeInSeconds / 60;

      const endHours = Math.floor(totalMinutes / 60) % 24;
      const endMinutes = Math.floor(totalMinutes % 60);

      return `${endHours.toString().padStart(2, "0")}:${endMinutes
        .toString()
        .padStart(2, "0")}`;
    };

    setEndTime(calculateEndTime(startTime));
  }, [startTime, totalFastingTimeInSeconds, setEndTime]);

  return (
    <div className={styles.TimeInputsContainer}>
      <TimeInput
        label="Start to"
        value={startTime}
        onChange={handleStartTimeChange}
      />
      <TimeInput label="End to" value={endTime} disabled />
    </div>
  );
};

export default FastingTimes;
