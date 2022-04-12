import { configureStore } from "@reduxjs/toolkit";
import leaderReducer from "../features/leader/leaderSlice";

export default configureStore({
  reducer: { leaderReducer },
});
