import { createSlice } from "@reduxjs/toolkit";

export const leaderIdSlice = createSlice({
  name: "leaderId",
  initialState: {
    value: 3,
  },
  reducers: {
    addLeaderId: (state, action) => {
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
