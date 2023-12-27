import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleName } from "./constants";
import { favorites } from "../../api/services/favorite";
import { IAddFavoriteData } from "../../types";

const fetchFavourites = createAsyncThunk(
  `${moduleName}/fetchFavourites`,
  async (id: number) => {
    const favoriteItems =
      localStorage.getItem("favoriteItems") !== null &&
      localStorage.getItem("favoriteItems") !== ""
        ? JSON.parse(localStorage.getItem("favoriteItems") as string)
        : [];

    let favoriteList = await favorites.fetch(id);
    const difference = favoriteItems.filter(
      (num: number) => favoriteList.includes(num) === false
    );
    if (difference.length > 0) {
      difference.map((el: number) => favorites.add(id, el));
      favoriteList = await favorites.fetch(id);
    }
    return favoriteList;
  }
);

const addFavorite = createAsyncThunk(
  `${moduleName}/addFavorite`,
  async (userData: IAddFavoriteData) => {
    const response = await favorites.add(userData.userId, userData.postId);
    return response;
  }
);

const deleteFavourite = createAsyncThunk(
  `${moduleName}/deleteFavourite`,
  async (userData: IAddFavoriteData) => {
    const response = await favorites.delete(userData.userId, userData.postId);
    return response;
  }
);

export default {
  fetchFavourites,
  addFavorite,
  deleteFavourite
};
