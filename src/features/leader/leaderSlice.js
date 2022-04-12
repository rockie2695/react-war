import { createSlice } from "@reduxjs/toolkit";

export const leaderSlice = createSlice({
  name: "leader",
  initialState: {
    value: [{ name: "name", soliderNum: 100 }],
  },
  reducers: {
    addLeader: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLeader } = leaderSlice.actions;

export default leaderSlice.reducer;
