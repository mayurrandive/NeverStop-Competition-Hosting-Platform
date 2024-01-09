import { createSlice } from "@reduxjs/toolkit";

const init = {
  refreshToken: null,
  accessToken: null,
  user: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: init,
  reducers: {
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },

});

// Action creators are generated for each case reducer function
export const { setAccessToken, setRefreshToken, setUser, logout } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;

export default AuthSlice.reducer;
