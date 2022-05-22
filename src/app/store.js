import { configureStore } from "@reduxjs/toolkit";
import leaderReducer from "../features/leader/leaderSlice";
import leaderLevelReducer from "../features/leader/leaderLevelSlice";
import leaderIdReducer from "../features/leader/leaderIdSlice";
import settingReducer from "../features/setting/settingSlice";

export default configureStore({
  reducer: {
    leaderReducer,
    leaderLevelReducer,
    leaderIdReducer,
    settingReducer,
  },
});
