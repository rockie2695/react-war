import { createSlice } from "@reduxjs/toolkit";

export const leaderLevelSlice = createSlice({
  name: "leaderLevel",
  initialState: 3,
  reducers: {
    addLeaderLevel: (state, action) => state + 1,
    minusLeaderLevel: (state, action) => state - 1,
  },
});

// Action creators are generated for each case reducer function
export const { addLeaderLevel, minusLeaderLevel } = leaderLevelSlice.actions;

export default leaderLevelSlice.reducer;
