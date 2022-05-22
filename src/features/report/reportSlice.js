import { createSlice } from "@reduxjs/toolkit";

export const leaderLevelSlice = createSlice({
  name: "leaderLevel",
  initialState: {
    value: 3,
  },
  reducers: {
    setReport: (state, action) => {
      state.value++;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLeaderLevel, minusLeaderLevel } = leaderLevelSlice.actions;

export default leaderLevelSlice.reducer;
