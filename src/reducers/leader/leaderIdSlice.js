import { createSlice } from "@reduxjs/toolkit";

export const leaderIdSlice = createSlice({
  name: "leaderId",
  initialState: 1,
  reducers: {
    addLeaderId: (state, action) => state + 1,
    minusLeaderId: (state, action) => state - 1,
  },
});

// Action creators are generated for each case reducer function
export const { addLeaderId, minusLeaderId } = leaderIdSlice.actions;

export default leaderIdSlice.reducer;
