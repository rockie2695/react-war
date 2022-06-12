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
    real: {
      1: [],
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
    clone: {},
  },
  reducers: {
    addLeader: (state, action) => {
      state.real[action.payload.leaderLevel].push({
        ...action.payload,
      });
    },
    setCloneLeader: (state, action) => {
      console.log(action);
      state.clone = action.payload;
    },
    changeOneRealLeader: (state, action) => {
      console.log(action.payload);
      let index = state.real[action.payload.leaderLevel].findIndex(
        (leader) => leader.id === action.payload.id
      );
      state.real[action.payload.leaderLevel][index] = {
        ...state.real[action.payload.leaderLevel][index],
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLeader, setCloneLeader, changeOneRealLeader } =
  leaderSlice.actions;

export default leaderSlice.reducer;
