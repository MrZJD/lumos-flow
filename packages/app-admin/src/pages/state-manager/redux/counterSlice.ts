import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'counter',
  initialState: {
    count: 0,
    countB: 0
  },
  reducers: {
    increment: (state) => {
      state.count += 1; // immer
    },
    decrement: (state) => {
      state.count -= 1;
    },
    increB: (state) => {
      state.countB += 1;
    }
  }
});
