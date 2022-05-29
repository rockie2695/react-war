import { createSlice } from "@reduxjs/toolkit";

export const sideNameSlice = createSlice({
  name: "sideName",
  initialState: {
    value: { my: "my", enemy: "enemy" },
  },
  reducers: {
    setSideName: (state, action) => {
      state.value[action.payload.key] = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSideName } = sideNameSlice.actions;

export default sideNameSlice.reducer;
