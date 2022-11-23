import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
  },
};

export const adminSlice = createSlice({
  name: "counter admin",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.username = 0;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;