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
    id: 1,
  },
  {
    name: randomPeopleName().name,
    soliderNum: 50,
    maxSoliderNum: 100,
    leaderLevel: 1,
    leaderPower: 3,
    side: "enemy",
    id: 2,
  },
];

export const leaderSlice = createSlice({
  name: "leader",
  initialState: {
    value: {
      1: testData,
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
    },
  },
  reducers: {
    addLeader: (state, action) => {
      state.value[action.payload.leaderLevel].push({
        ...action.payload,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLeader } = leaderSlice.actions;

export default leaderSlice.reducer;
