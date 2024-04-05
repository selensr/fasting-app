import { ChangeEvent, FC } from "react";
import styles from "./FastingTimeInput.module.scss";
import { useFastingTime } from "../../contexts/FastingTimeContext";

export const FastingTimeInput: FC = () => {
  const { hours, minutes, seconds, setHours, setMinutes, setSeconds } =
    useFastingTime();

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = formatInputValue(e.target.value);
    setHours(newValue);
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = formatInputValue(e.target.value);
    setMinutes(newValue);
  };

  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = formatInputValue(e.target.value);
    setSeconds(newValue);
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

function formatInputValue(value: string): string {
  if (value.length > 2) {
    return value.slice(0, 2);
  }
  return value.padStart(2, "0");
}
