import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    value: {
      numAddPeople: { value: 1, minLength: 1, maxLength: 3, min: 1, max: 100 },
      attackRandomFlowUpper: { value: 110 },
      attackRandomFlowLower: { value: 90 },
      attackAndSoliderRatio: { value: 10 },
    },
  },
  reducers: {
    changeSetting: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value[action.payload.key].value = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSetting } = settingSlice.actions;

export default settingSlice.reducer;
