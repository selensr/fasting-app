import { createSlice } from "@reduxjs/toolkit";

export type FastingState = {
  state: "neutral" | "active" | "completed";
};

const initialState: FastingState = {
  state: "neutral",
};

export const fastingStateSlice = createSlice({
  name: "fastingState",
  initialState,
  reducers: {
    setFastingState: (state, { payload }) => {
      state.state = payload;
    },
  },
});

export const { setFastingState } = fastingStateSlice.actions;

export default fastingStateSlice.reducer;
