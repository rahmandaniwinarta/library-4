import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    NIM: null,
  },
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.NIM = action.payload.NIM;
    },
    logout: (state) => {
      state.value.NIM = 0;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
