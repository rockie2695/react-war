import { createSlice } from "@reduxjs/toolkit";
import { randomPeopleName } from "../../script/random";

const testData = [
  {
    name: randomPeopleName().name,
    soliderNum: 100,
    maxSoliderNum: 100,
    leaderLevel: 1,
    leaderPower: 5,
    side: "my",
  },
  {
    name: randomPeopleName().name,
    soliderNum: 50,
    maxSoliderNum: 100,
    leaderLevel: 1,
    leaderPower: 3,
    side: "enemy",
  },
];

export const leaderSlice = createSlice({
  name: "leader",
  initialState: {
    value: testData, //[]
  },
  reducers: {
    addLeader: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action.payload);
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLeader } = leaderSlice.actions;

export default leaderSlice.reducer;
