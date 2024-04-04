import { useAppSelector } from "../../store/hooks";
import { Card } from "../Card/Card";

export const CardSection = () => {
  const fastingList = useAppSelector((state) => state.fastingList.fastingList);
  const totalHours = useAppSelector((state) => state.fastingList.totalHours);
  return (
    <>
      <Card icon={"⌛"} value={totalHours} label="Total Hours" />
      <Card
        icon={"🎉"}
        value={fastingList.length > 0 ? fastingList.length : 0}
        label="Total Completed Fasting"
      />
    </>
  );
};
