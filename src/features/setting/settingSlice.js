import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    value: { numAddPeople: 1 },
  },
  reducers: {
    changeSetting: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value[action.payload.key] = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSetting } = settingSlice.actions;

export default settingSlice.reducer;
