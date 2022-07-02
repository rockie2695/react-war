import { createSlice } from "@reduxjs/toolkit";

export const mouseOverLeaderSlice = createSlice({
  name: "mouseOverLeader",
  initialState: null,
  reducers: {
    setMouseOverLeader: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setMouseOverLeader } = mouseOverLeaderSlice.actions;

export default mouseOverLeaderSlice.reducer;
