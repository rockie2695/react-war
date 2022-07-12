import { createSlice } from "@reduxjs/toolkit";

export const selectedLeaderSlice = createSlice({
  name: "selectedLeader",
  initialState: {
    mouseOverLeader: null,
    clickedLeader: null,
    clickedLeaderInputLimit: {
      name: {
        type: "text",
        name: "name",
        minLength: 1,
      },
      soliderNum: {
        type: "number",
        name: "soliderNum",
        minLength: 1,
        min: 1,
      },
      maxSoliderNum: {
        type: "number",
        name: "maxSoliderNum",
        minLength: 1,
        min: 1,
      },
      soliderNumPerc: {
        type: "number",
        name: "soliderNumPerc",
        minLength: 1,
        min: 0,
        max: 100,
        maxLength: 3,
      },
      leaderPower: {
        type: "number",
        name: "leaderPower",
        minLength: 1,
        maxLength: 3,
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
