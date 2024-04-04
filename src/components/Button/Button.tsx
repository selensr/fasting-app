// src/components/Button/Button.tsx
import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import cls from "classnames";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
}) => {
  return (
    <button
      className={cls(styles.button, className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
