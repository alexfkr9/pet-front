import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { moduleName } from "./constants";
import thunks from "./thunks";
import { favoriteItems } from "../../api/constants";

// interface IFavoriteState {
//   favoriteList: any[];
// }

const initialState: any = {
  favoriteList: favoriteItems?.length > 0 ? favoriteItems : []
};

export const favoriteSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.favoriteList?.includes(action.payload) === false) {
        state.favoriteList.push(action.payload);
      } else {
        state.favoriteList = state.favoriteList.filter(
          (el: any) => el !== action.payload
        );
      }
      localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteList));
    },
    clearFavorites: (state) => {
      state.favoriteList = [];
      localStorage.setItem("favoriteItems", "");
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      thunks.fetchFavourites.fulfilled,
      (state: any, action: PayloadAction) => {
        localStorage.setItem("favoriteItems", "");
        state.favoriteList = action.payload;
      }
    );
  }
});

export const { toggleFavorite, clearFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
