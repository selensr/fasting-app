import { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import cls from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={cls(styles.input, className)} {...props} />
    </div>
  );
};

export default Input;
