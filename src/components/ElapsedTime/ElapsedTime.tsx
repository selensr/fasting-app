import { useFastingTime } from "../../contexts/FastingTimeContext";
import styles from "./ElapsedTime.module.scss";

export const ElapsedTime = () => {
  const { elapsedTimeInSeconds, totalFastingTimeInSeconds } = useFastingTime();

  const hours = Math.round(elapsedTimeInSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.round((elapsedTimeInSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.round(elapsedTimeInSeconds % 60)
    .toString()
    .padStart(2, "0");

  const progress = Math.round(
    (elapsedTimeInSeconds / totalFastingTimeInSeconds) * 100
  );

  return (
    <>
      <p className={styles.text}>Elapsed Time (%{progress})</p>
      <div className={styles.elapsedTimeContainer}>
        <span className={styles.time}>{hours}</span>
        <span>:</span>
        <span className={styles.time}>{minutes}</span>
        <span>:</span>
        <span className={styles.time}>{seconds}</span>
      </div>
    </>
  );
};
