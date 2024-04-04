import { FC, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Home.module.scss";
import Button from "../../components/Button/Button";
import { CircularTimer } from "../../components/CircularTimer/CircularTimer";
import FastingTimes from "../../components/FastingTimes/FastingTimes";
import { FastingList } from "../../components/FastingList/FastingList";
import { useAuth } from "../../contexts/AuthContext";
import { FastingTimeInput } from "../../components/FastingTimeInput/FastingTimeInput";
import { FastingTimeProvider } from "../../contexts/FastingTimeContext";
import { ElapsedTime } from "../../components/ElapsedTime/ElapsedTime";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFastingState } from "../../store/slices/fastingStateSlice";
import { CardSection } from "../../components/CardSection/CardSection";

export type FastingState = "neutral" | "active" | "completed";
export const Home: FC = () => {
  const fastingState = useAppSelector((state) => state.fastingState.state);
  const dispatch = useAppDispatch();
  const [restart, setRestart] = useState<boolean>(false);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const { user } = useAuth();

  const fastingStateText = "Ready to Fasting";

  const buttonText =
    fastingState === "neutral"
      ? "Start Fasting"
      : fastingState === "active"
      ? "End Fasting"
      : "Start New Fasting Session";

  const handleOnClick = () => {
    if (fastingState === "neutral") {
      dispatch(setFastingState("active"));
    }

    if (fastingState === "active") {
      dispatch(setFastingState("completed"));
    }

    if (fastingState === "completed") {
      dispatch(setFastingState("neutral"));
      setRestart(true);
    }
  };
  return (
    <Layout>
      <div className={styles.homeContainer}>
        <p>Hello {user?.name}</p>
        {!viewAll && (
          <div className={styles.contentContainer}>
            <h1 className={styles.title}>{fastingStateText}</h1>

            <FastingTimeProvider>
              <CircularTimer restart={restart} setRestart={setRestart} />

              <div className={styles.elapsedTimeContainer}>
                {fastingState === "neutral" ? (
                  <FastingTimeInput />
                ) : (
                  <ElapsedTime />
                )}
              </div>

              <FastingTimes />
            </FastingTimeProvider>

            <Button className={styles.startButton} onClick={handleOnClick}>
              {buttonText}
            </Button>
          </div>
        )}

        <div className={styles.cards}>
          <CardSection />
        </div>

        <FastingList setViewAll={setViewAll} viewAll={viewAll} />
      </div>
    </Layout>
  );
};
