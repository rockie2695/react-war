import { createSlice } from "@reduxjs/toolkit";

export const leaderLevelSlice = createSlice({
  name: "leaderLevel",
  initialState: {
    value: 3,
  },
  reducers: {
    addLeaderLevel: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value++;
    },
    minusLeaderLevel: (state, action) => {
      state.value--;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLeaderLevel } = leaderLevelSlice.actions;

export default leaderLevelSlice.reducer;
