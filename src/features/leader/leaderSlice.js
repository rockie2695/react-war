import { createSlice } from "@reduxjs/toolkit";

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
    setLeader: (state, action) => {
      state.real = action.payload;
    },
    setCloneLeader: (state, action) => {
      state.clone = action.payload;
    },
    moveLeaderToLevel: (state, action) => {
      state.real[action.payload.fromLeaderLevel] = state.real[
        action.payload.fromLeaderLevel
      ].map((row) => {
        return { ...row, leaderLevel: action.payload.toLeaderLevel };
      });
      state.real[action.payload.toLeaderLevel] = [
        ...state.real[action.payload.toLeaderLevel],
        ...state.real[action.payload.fromLeaderLevel],
      ];
      state.real[action.payload.fromLeaderLevel] = [];
    },
    changeOneRealLeader: (state, action) => {
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
export const {
  addLeader,
  setCloneLeader,
  changeOneRealLeader,
  moveLeaderToLevel,
  setLeader,
} = leaderSlice.actions;

export default leaderSlice.reducer;
