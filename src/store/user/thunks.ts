import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleName } from "./constants";
import { AxiosHeaders } from "axios";
import Cookies from "js-cookie";
import { IAuthInputsTypes } from "../../types/index";
import { userApi } from "../../Api";

export const loginUser = createAsyncThunk(
  `${moduleName}/loginUser`,
  async ({ email, password }: IAuthInputsTypes) => {
    const newToken = `${btoa(`${email}:${password}`)}`;
    const response = await userApi
      .getCurrentUser({
        headers: new AxiosHeaders({
          Authorization: `Basic ${newToken}`
        })
      })
      .then((response: any) => {
        const oneDay = 1;
        Cookies.set("access_token", newToken, { expires: oneDay });
        Cookies.set("user_id", response?.data?.id, { expires: oneDay });
        Cookies.set("role", response?.data?.role, { expires: oneDay });
        return response.data;
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    return response;
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginUser
};
