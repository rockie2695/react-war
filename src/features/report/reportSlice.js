import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    value: { history: [], sideName: {} },
  },
  reducers: {
    setReport: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReport } = reportSlice.actions;

export default reportSlice.reducer;
