import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { favoriteReducer } from "./favorites";
import { postReducer } from "./post";

const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
    favoriteReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
