import { createSlice } from "@reduxjs/toolkit";

export const selectedLeaderSlice = createSlice({
  name: "selectedLeader",
  initialState: { mouseOverLeader: null, clickLeader: null },
  reducers: {
    setMouseOverLeader: (state, action) => {
      return { ...state, mouseOverLeader: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMouseOverLeader } = selectedLeaderSlice.actions;

export default selectedLeaderSlice.reducer;
