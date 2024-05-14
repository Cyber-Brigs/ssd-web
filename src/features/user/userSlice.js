import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUserRef: null,
    refreshToken: null,
    accessToken: null,
  },
  reducers: {
    setLoggedInUserRef: (state, action) => {
      const { loggedInUserRef } = action.payload;
      state.loggedInUserRef = loggedInUserRef;
    },
    setRefreshToken: (state, action) => {
      const { refreshToken } = action.payload;
      state.refreshToken = refreshToken;
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
  },
  // extraReducers: {},
});

export const { setLoggedInUserRef, setRefreshToken, setAccessToken } =
  userSlice.actions;

export const selectLoggedInUserRef = (state) => state?.user?.loggedInUserRef;
export const selectRefreshToken = (state) => state?.user?.refreshToken;
export const selectAccessToken = (state) => state?.user?.accessToken;

export default userSlice.reducer;
