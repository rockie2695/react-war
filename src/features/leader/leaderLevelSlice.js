import { createSlice } from "@reduxjs/toolkit";

export const leaderLevelSlice = createSlice({
  name: "leaderLevel",
  initialState: 1,
  reducers: {
    addLowerLeaderLevel: (state, action) => state + 1,
    minusLowerLeaderLevel: (state, action) => state - 1,
  },
});

// Action creators are generated for each case reducer function
export const { addLowerLeaderLevel, minusLowerLeaderLevel } = leaderLevelSlice.actions;

export default leaderLevelSlice.reducer;
