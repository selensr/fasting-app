import { FC, useEffect, useRef } from "react";
import styles from "./CircularTimer.module.scss";

import confetti from "canvas-confetti";

import { useFastingTime } from "../../contexts/FastingTimeContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFastingState } from "../../store/slices/fastingStateSlice";

interface CircularTimerProps {
  restart: boolean;
  setRestart: (state: boolean) => void;
}

// Gradient colors for each state
const neutralGradientId = "paint0_linear_1_55"; // Your neutral gradient ID
const activeGradientId = "paint0_linear_2_107"; // Your active gradient ID
const completedGradientId = "paint0_linear_2_164"; // Your completed gradient ID

export const CircularTimer: FC<CircularTimerProps> = ({
  restart,
  setRestart,
}) => {
  const { setElapsedTime, totalFastingTimeInSeconds, setElapsedTimeInSeconds } =
    useFastingTime();

  const fastingState = useAppSelector((state) => state.fastingState.state);
  const dispatch = useAppDispatch();

  const updateInterval = 10; // 10ms

  const svgRef = useRef<SVGSVGElement>(null);

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  //TODO: This interval does not persist when the component is unmounted, so the timer will stop or if the fastingState active it will restart
  //To avoid this, we can store the interval id in a state and clear it when the component is unmounted

  //TODO: Elapsed time is not persisting too, so when the component is unmounted, the elapsed time will reset
  //This is why you see resetted elapsed time when you try view all

  useEffect(() => {
    let interval: number;
    const path = document.getElementById(
      "progressPath"
    ) as unknown as SVGPathElement;
    const pathLength = path?.getTotalLength() || 0;

    if (path) {
      path.style.strokeDasharray = `${pathLength}`;
    }

    if (fastingState === "neutral" && path) {
      path.style.strokeDashoffset = "0";
    }

    if (fastingState === "active") {
      interval = setInterval(() => {
        const setElapsedTimeFunc = () => {
          setElapsedTimeInSeconds((prevNumber: number) => {
            return prevNumber + updateInterval / 1000;
          });

          setElapsedTime((prevProgress: number) => {
            const increment =
              (pathLength / totalFastingTimeInSeconds) *
              (updateInterval / 1000);
            const newProgress = prevProgress + increment;

            if (path) {
              path.style.strokeDashoffset = `${pathLength - newProgress}`;
            }

            //stop the timer if it reaches the end
            if (newProgress >= pathLength) {
              clearInterval(interval);
              dispatch(setFastingState("completed"));
              launchConfetti();
              return pathLength;
            }

            return newProgress;
          });
        };

        setElapsedTimeFunc();
      }, updateInterval);
    }

    return () => clearInterval(interval);
  }, [
    fastingState,
    setElapsedTime,
    totalFastingTimeInSeconds,
    setElapsedTimeInSeconds,
    dispatch,
  ]);

  useEffect(() => {
    if (restart) {
      setElapsedTime(0);
      setElapsedTimeInSeconds(0);
      setRestart(false);
    }
  }, [
    restart,
    setElapsedTime,
    setElapsedTimeInSeconds,
    fastingState,
    setRestart,
  ]);

  const currentGradientId =
    fastingState === "neutral"
      ? neutralGradientId
      : fastingState === "active"
      ? activeGradientId
      : completedGradientId;

  return (
    <div className={styles.circularTimerContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.circularTimer}
        id="circularTimer"
        viewBox="0 0 421 380"
        fill="none"
        ref={svgRef}
      >
        {/* Background Circle */}
        <circle
          opacity="0.3"
          cx="132.5"
          cy="132.5"
          r="132.5"
          transform="matrix(-0.889835 0.456283 0.456283 0.889835 267.806 22.4539)"
          stroke="#C4C4C4"
          strokeWidth="33"
          strokeLinecap="round"
        />
        {/* The rest of the static SVG is dynamic content */}
        <g>
          <path
            d="M92.3763 260.66C82.0582 240.537 77.0761 218.103 77.9054 195.498C78.7347 172.892 85.3478 150.87 97.1136 131.532C108.879 112.195 125.405 96.1879 145.114 85.0386C164.823 73.8892 187.057 67.9698 209.694 67.8452C232.331 67.7205 254.617 73.3949 274.423 84.3267C294.229 95.2584 310.896 111.083 322.832 130.29C334.769 149.497 341.576 171.445 342.605 194.04C343.635 216.636 338.851 239.124 328.712 259.359"
            stroke={`url(#${currentGradientId})`}
            strokeWidth="35"
            strokeLinecap="round"
            id="progressPath"
          />
        </g>

        <defs>
          <linearGradient
            id="paint0_linear_1_55"
            x1="378.116"
            y1="198.406"
            x2="-53.6853"
            y2="430.756"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#6567D9" />
            <stop offset="1" stop-color="#B4B5F9" />
          </linearGradient>

          <linearGradient
            id="paint0_linear_2_107"
            x1="378.116"
            y1="176.406"
            x2="-53.6855"
            y2="408.756"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FF6B00" />
            <stop offset="1" stop-color="#FFEDD9" />
            <stop offset="1" stop-color="#FFCB8D" />
          </linearGradient>

          <linearGradient
            id="paint0_linear_2_164"
            x1="378.116"
            y1="198.406"
            x2="-53.6855"
            y2="430.756"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#52D13D" />
            <stop offset="1" stop-color="#89C36D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
