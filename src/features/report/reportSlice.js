import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
  name: "report",
  initialState: { history: [], sideName: {}, round: 0, stop: false },
  reducers: {
    setReport: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReport } = reportSlice.actions;

export default reportSlice.reducer;
