import { FC } from "react";
import styles from "./Header.module.scss";
import Logo from "../Icons/Logo";
import SignOut from "../Icons/SignOut";
import { useAuth } from "../../contexts/AuthContext";

const Header: FC = () => {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </div>
      <button
        className={styles.signOutButton}
        onClick={logout}
        aria-label="Sign out"
      >
        <SignOut />
      </button>
    </header>
  );
};

export default Header;
