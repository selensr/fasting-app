import { createSlice } from "@reduxjs/toolkit";

type UserSliceState = {
  name: string;
  email: string;
  password: string;
};

const initialState: UserSliceState = {
  name: "",
  email: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.password = payload.password;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
