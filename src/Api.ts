import { Configuration, UserApi, PostApi, LogApi } from "./client";
import axios from "axios";
import Cookies from "js-cookie";
import { apiUrl } from "../src/api/constants";

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (
      token !== null &&
      token !== undefined &&
      config.headers.Authorization === undefined
    ) {
      config.headers.Authorization = `Basic ${token}`;
    }

    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

/**
 * Here is a facade for API
 * We can add host configuration and middleware here
 */
export const userApi = new UserApi(new Configuration({ basePath: apiUrl }));

export const postApi = new PostApi(new Configuration({ basePath: apiUrl }));

export const logApi = new LogApi(new Configuration({ basePath: apiUrl }));
