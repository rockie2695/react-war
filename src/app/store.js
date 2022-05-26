import { configureStore } from "@reduxjs/toolkit";
import leaderReducer from "../features/leader/leaderSlice";
import leaderLevelReducer from "../features/leader/leaderLevelSlice";
import leaderIdReducer from "../features/leader/leaderIdSlice";
import settingReducer from "../features/setting/settingSlice";
import reportReducer from "../features/report/reportSlice";

export default configureStore({
  reducer: {
    leaderReducer,
    leaderLevelReducer,
    leaderIdReducer,
    settingReducer,
    reportReducer,
  },
});
