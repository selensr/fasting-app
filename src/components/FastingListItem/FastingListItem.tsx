import { FC } from "react";
import styles from "./FastingListItem.module.scss";
import { Badge } from "../Badge/Badge";
import More from "../Icons/More";
import { useAppDispatch } from "../../store/hooks";
import { removeFastingTime } from "../../store/slices/fastingListSlice";

interface FastingListItemProps {
  id: string;
  duration: string;
  startTime: string;
  endTime: string;
  timestamp: string;
}
export const FastingListItem: FC<FastingListItemProps> = ({
  id,
  duration,
  startTime,
  endTime,
  timestamp,
}) => {
  const dispatch = useAppDispatch();
  const formattedDuration = () => {
    const [hours, minutes, seconds] = duration.split(":");
    if (parseInt(hours) > 0) {
      return `${hours} Hours`;
    } else if (parseInt(minutes) > 0) {
      return `${minutes} Minutes`;
    } else {
      return `${seconds} Seconds`;
    }
  };

  const formattedTimestamp = () => {
    const time = new Date(timestamp);
    const currentTime = new Date();
    const diff = currentTime.getTime() - time.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} Hours ago`;
    } else if (minutes > 0) {
      return `${minutes} Minutes ago`;
    } else {
      return `${seconds} Seconds ago`;
    }
  };

  const handleOnClick = () => {
    console.log("Removing fasting time with id: ", id);
    dispatch(removeFastingTime(id));
  };

  return (
    <div className={styles.fastingCard}>
      <div className={styles.fastingGroup}>
        <div className={styles.timestampGroup}>
          <div className={styles.fastingDuration}>{formattedDuration()}</div>
          <Badge value={formattedTimestamp()} />
        </div>

        <div className={styles.startEndTimes}>
          {startTime} - {endTime}
        </div>
      </div>

      <button className={styles.menuButton} onClick={handleOnClick}>
        <More />
      </button>
    </div>
  );
};
