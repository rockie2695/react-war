import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    numAddPeople: {
      type: "number",
      name: "numAddPeople",
      value: 1,
      minLength: 1,
      maxLength: 3,
      min: 1,
      max: 100,
    },
    eachFightPlayTime: {
      type: "number",
      name: "eachFightPlayTime",
      value: 1,
      minLength: 1,
      maxLength: 3,
      step: 0.01,
      max: 1,
      min: 0.01,
    },
    leaderPowerLower: {
      type: "number",
      name: "leaderPowerLower",
      value: 1,
      minLength: 1,
      maxLength: 3,
      max: 100,
      min: 1,
    },
    leaderPowerUpper: {
      type: "number",
      name: "leaderPowerUpper",
      value: 10,
      minLength: 1,
      maxLength: 3,
      max: 100,
      min: 1,
    },
    attackRandomFlowUpper: {
      type: "number",
      name: "attackRandomFlowUpper",
      value: 110,
      minLength: 1,
      maxLength: 3,
      min: 1,
      max: 999,
    },
    attackRandomFlowLower: {
      type: "number",
      name: "attackRandomFlowLower",
      value: 90,
      minLength: 1,
      maxLength: 3,
      min: 1,
      max: 999,
    },
    attackAndsoldierRatio: {
      type: "number",
      name: "attackAndsoldierRatio",
      value: 10,
      minLength: 1,
      maxLength: 3,
      min: 1,
      max: 100,
    },
    showsoldierNumOrPerc: {
      type: "string",
      name: "showsoldierNumOrPerc",
      value: "percentage",
    },
    leaderPowerTimes: {
      type: "number",
      name: "leaderPowerTimes",
      value: 5,
      minLength: 1,
      maxLength: 2,
      min: 1,
      max: 10,
      step: 0.5,
    },
  },
  reducers: {
    changeSetting: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state[action.payload.key].value = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSetting } = settingSlice.actions;

export default settingSlice.reducer;
