import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    history: [],
    sideName: {},
    round: 0,
    stop: false,
    cloneHistory: [],
  },
  reducers: {
    setReport: (state, action) => {
      return { ...state, ...action.payload };
    },
    setStop: (state, action) => {
      state.stop = action.payload;
    },
    setRound: (state, action) => {
      state.round = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReport, setStop, setRound } = reportSlice.actions;

export default reportSlice.reducer;
