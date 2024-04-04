import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import fastingListSlice from "./slices/fastingListSlice";
import fastingStateSlice from "./slices/fastingStateSlice";

const rootReducer = combineReducers({
  user: userReducer,
  fastingList: fastingListSlice,
  fastingState: fastingStateSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
