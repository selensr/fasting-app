import { FC } from "react";
import styles from "./Badge.module.scss";

interface BadgeProps {
  value: string;
}
export const Badge: FC<BadgeProps> = ({ value }) => {
  return (
    <div className={styles.badgeContainer}>
      <p className={styles.text}>{value.toUpperCase()}</p>
    </div>
  );
};
