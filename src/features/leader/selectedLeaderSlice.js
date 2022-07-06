import { createSlice } from "@reduxjs/toolkit";

export const selectedLeaderSlice = createSlice({
  name: "selectedLeader",
  initialState: {
    mouseOverLeader: null,
    clickedLeader: null,
    clickedLeaderInputLimit: {
      soliderNum: {
        type: "number",
        name: "soliderNum",
        value: 1,
        minLength: 1,
        maxLength: 7,
        min: 1,
        max: 9999999,
      },
    },
  },
  reducers: {
    setMouseOverLeader: (state, action) => {
      return { ...state, mouseOverLeader: action.payload };
    },
    setClickedLeader: (state, action) => {
      return { ...state, clickedLeader: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMouseOverLeader, setClickedLeader } =
  selectedLeaderSlice.actions;

export default selectedLeaderSlice.reducer;
