import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IUserInitialState } from "../../types/index";
import { loginUser } from "./thunks";
import { moduleName } from "./constants";

const userAccessToken = Cookies.get("access_token");
const userInfo = Number(Cookies.get("user_id"));
const role = Cookies.get("role");

const initialState: IUserInitialState = {
  token: userAccessToken ?? null,
  status: "idle",
  userId: userInfo ?? null,
  role: role ?? null
};

export const userSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { email, password } = action.payload;
      const newToken = `${btoa(`${email}:${password}`)}`;
      const oneDay = 1;
      Cookies.set("access_token", newToken, { expires: oneDay });
      Cookies.set("user_id", action.payload.id, { expires: oneDay });
      Cookies.set("role", "USER");
      state.token = newToken;
      state.userId = action.payload.id;
      state.role = "USER";
    },
    logoutUser: (state) => {
      Cookies.remove("access_token");
      Cookies.remove("user_id");
      Cookies.remove("role");
      state.token = null;
      state.userId = null;
      state.role = null;
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(loginUser.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.token = Cookies.get("access_token");
        state.userId = Number(Cookies.get("user_id"));
        state.role = Cookies.get("role");
      });
  }
});

export const authActions = { ...userSlice.actions, loginUser };

export default userSlice.reducer;
