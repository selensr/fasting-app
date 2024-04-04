import { FC } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  icon: JSX.Element | string;
  value: string | number;
  label: string;
}

export const Card: FC<CardProps> = ({ icon, value, label }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardValue}>{value}</div>
      <div className={styles.cardLabel}>{label}</div>
    </div>
  );
};
