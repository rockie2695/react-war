import { createSlice } from "@reduxjs/toolkit";

export const leaderLevelSlice = createSlice({
  name: "report",
  initialState: {
    value: [],
  },
  reducers: {
    setReport: (state, action) => {
      state.value = [...state.value, ...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLeaderLevel, minusLeaderLevel } = leaderLevelSlice.actions;

export default leaderLevelSlice.reducer;
