import { ChangeEvent, FC } from "react";
import styles from "./TimeInput.module.scss";

interface TimeInputProps {
  label: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
export const TimeInput: FC<TimeInputProps> = ({
  label,
  value,
  onChange,
  disabled,
}) => (
  <div className={styles.timeInputContainer}>
    <label className={styles.timeInputLabel}>{label}</label>
    <input
      className={styles.timeInput}
      type="time"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);
