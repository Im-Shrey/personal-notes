import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken:
    localStorage.getItem(
      "accessToken"
    ) || null,

  refreshToken:
    localStorage.getItem(
      "refreshToken"
    ) || null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials:
      (state, action) => {

        state.accessToken =
          action.payload.access;

        state.refreshToken =
          action.payload.refresh;

        localStorage.setItem(
          "accessToken",
          action.payload.access
        );

        localStorage.setItem(
          "refreshToken",
          action.payload.refresh
        );
      },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );
    },
  },
});

export const {
  setCredentials,
  logout,
} = authSlice.actions;

export default authSlice.reducer;