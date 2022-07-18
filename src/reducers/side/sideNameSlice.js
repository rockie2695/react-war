import { createSlice } from "@reduxjs/toolkit";

export const sideNameSlice = createSlice({
  name: "sideName",
  initialState: { my: "my", enemy: "enemy" },
  reducers: {
    setSideName: (state, action) => {
      if (action.payload.value !== "") {
        state[action.payload.key] = action.payload.value;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSideName } = sideNameSlice.actions;

export default sideNameSlice.reducer;
