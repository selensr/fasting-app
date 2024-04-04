import { FC } from "react";
import { FastingListItem } from "../FastingListItem/FastingListItem";
import styles from "./FastingList.module.scss";
import { useAppSelector } from "../../store/hooks";

export const FastingList: FC<{
  setViewAll: React.Dispatch<React.SetStateAction<boolean>>;
  viewAll: boolean;
}> = ({ setViewAll, viewAll }) => {
  const fastingList = useAppSelector((state) => state.fastingList.fastingList);

  return (
    <div className={styles.fastingListContainer}>
      <div className={styles.fastingListHeader}>
        <p className={styles.fastingText}>My Latest Fastings</p>
        <button
          className={styles.viewAllOption}
          type="button"
          onClick={() => setViewAll((param: boolean) => !param)}
        >
          View All
        </button>
      </div>

      <div className={styles.listGroup}>
        {viewAll
          ? fastingList.map((fasting) => (
              <FastingListItem key={fasting.timestamp} {...fasting} />
            ))
          : fastingList
              .slice(0, 2)
              .map((fasting) => (
                <FastingListItem key={fasting.timestamp} {...fasting} />
              ))}
      </div>
    </div>
  );
};
