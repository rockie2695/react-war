import { createSlice } from "@reduxjs/toolkit";

export const cloneLeaderSlice = createSlice({
  name: "cloneLeader",
  initialState: {
    value: {},
  },
  reducers: {
    setCloneLeader: (state, action) => {
        state.value = action.payload;
      },
  },
});

// Action creators are generated for each case reducer function
export const { setCloneLeader } = cloneLeaderSlice.actions;

export default cloneLeaderSlice.reducer;
