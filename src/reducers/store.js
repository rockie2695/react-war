import { configureStore } from "@reduxjs/toolkit";
import leaderReducer from "../reducers/leader/leaderSlice";
import leaderLevelReducer from "../reducers/leader/leaderLevelSlice";
import leaderIdReducer from "../reducers/leader/leaderIdSlice";
import settingReducer from "../reducers/setting/settingSlice";
import reportReducer from "../reducers/report/reportSlice";
import sideNameReducer from "../reducers/side/sideNameSlice";
import selectedLeaderReducer from "../reducers/leader/selectedLeaderSlice";

export default configureStore({
  reducer: {
    leaderReducer,
    leaderLevelReducer,
    leaderIdReducer,
    settingReducer,
    reportReducer,
    sideNameReducer,
    selectedLeaderReducer,
  },
});
