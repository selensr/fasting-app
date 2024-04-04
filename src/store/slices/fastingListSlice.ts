import { createSlice } from "@reduxjs/toolkit";

type FastingListSliceState = {
  fastingList: {
    id: string;
    duration: string;
    startTime: string;
    endTime: string;
    timestamp: string;
  }[];
  totalHours: number;
  totalCompletedFasts: number;
};

const initialState: FastingListSliceState = {
  fastingList: [],
  totalHours: 0,
  totalCompletedFasts: 0,
};

const fastingListSlice = createSlice({
  name: "fastingList",
  initialState,
  reducers: {
    addFastingTime: (state, { payload }) => {
      state.fastingList.push(payload.fastingTime);
    },
    removeFastingTime: (state, { payload }) => {
      const index = state.fastingList.findIndex(
        (fastingTime) => fastingTime.id === payload
      );
      state.fastingList.splice(index, 1);
    },
    setTotalHours: (state, { payload }) => {
      state.totalHours += payload;
    },
    setTotalCompletedFasts: (state, { payload }) => {
      state.totalCompletedFasts = payload.totalCompletedFasts;
    },
  },
});

export const {
  addFastingTime,
  removeFastingTime,
  setTotalHours,
  setTotalCompletedFasts,
} = fastingListSlice.actions;

export default fastingListSlice.reducer;
