import { ChangeEvent, FC } from "react";
import styles from "./FastingTimeInput.module.scss";
import { useFastingTime } from "../../contexts/FastingTimeContext";

//TODO: make the input fields has max length of 2
export const FastingTimeInput: FC = () => {
  const { hours, minutes, seconds, setHours, setMinutes, setSeconds } =
    useFastingTime();

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.padStart(2, "0");
    setHours(value);
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.padStart(2, "0");
    setMinutes(value);
  };

  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.padStart(2, "0");
    setSeconds(value);
  };

  return (
    <>
      <p className={styles.text}>Set Fasting Time</p>
      <div className={styles.fastingTimeContainer}>
        <input
          type="number"
          value={hours}
          onChange={handleHoursChange}
          className={styles.input}
          max="23"
          min="0"
        />
        <span>:</span>
        <input
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          className={styles.input}
          max="59"
          min="0"
        />
        <span>:</span>
        <input
          type="number"
          value={seconds}
          onChange={handleSecondsChange}
          className={styles.input}
          max="59"
          min="0"
        />
      </div>
    </>
  );
};
