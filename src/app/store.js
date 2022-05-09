import { configureStore } from "@reduxjs/toolkit";
import leaderReducer from "../features/leader/leaderSlice";
import leaderLevelReducer from "../features/leaderLevel/leaderLevelSlice";
import settingReducer from "../features/setting/settingSlice";

export default configureStore({
  reducer: { leaderReducer, leaderLevelReducer, settingReducer },
});
