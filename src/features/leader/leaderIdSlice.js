import { createSlice } from "@reduxjs/toolkit";

export const leaderIdSlice = createSlice({
  name: "leaderId",
  initialState: {
    value: 3,
  },
  reducers: {
    addLeaderId: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value++;
    },
    minusLeaderId: (state, action) => {
      state.value--;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLeaderId, minusLeaderId } = leaderIdSlice.actions;

export default leaderIdSlice.reducer;
