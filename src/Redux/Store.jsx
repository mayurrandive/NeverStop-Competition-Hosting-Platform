import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  devTools: true,
});

export default store;