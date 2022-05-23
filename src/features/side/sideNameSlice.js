import { createSlice } from "@reduxjs/toolkit";

export const sideNameSlice = createSlice({
  name: "sideName",
  initialState: {
    value: { my: "my", enemy: "enemy" },
  },
  reducers: {
    setSideName: (state, action) => {
      state.value[action.value.key] = action.value.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSideName } = sideNameSlice.actions;

export default sideNameSlice.reducer;
