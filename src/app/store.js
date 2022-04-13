import { configureStore } from "@reduxjs/toolkit";
import leaderReducer from "../features/leader/leaderSlice";
import leaderLevelReducer from "../features/leaderLevel/leaderLevelSlice";

export default configureStore({
  reducer: { leaderReducer, leaderLevelReducer },
});
