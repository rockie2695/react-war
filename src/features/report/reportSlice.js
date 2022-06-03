import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
  name: "report",
  initialState: { history: [], sideName: {} },
  reducers: {
    setReport: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setReport } = reportSlice.actions;

export default reportSlice.reducer;
