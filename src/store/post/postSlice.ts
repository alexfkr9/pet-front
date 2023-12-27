import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { moduleName } from "./constants";
import thunks from "./thunks";

const initialState = {
  postsList: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: null,
  lastID: 10000000,
  isAllDataFetched: false
};

export const postSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    resetInitialState: (state) => {
      state.postsList = [];
      state.status = "idle";
      state.fetchError = null;
      state.lastID = 10000000;
      state.isAllDataFetched = false;
    },

    ascResetInitialState: (state) => {
      state.postsList = [];
      state.status = "idle";
      state.fetchError = null;
      state.lastID = 0;
      state.isAllDataFetched = false;
    }
  },
  extraReducers: (builder: any) => {
    const setLoadingState = (state: any) => {
      state.status = "loading";
      state.fetchError = null;
    };

    const setSuccessState = (state: any, action: PayloadAction<string>) => {
      state.status = "succeeded";
      state.fetchError = null;

      if (action.payload.length !== 0 && action.payload !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const lastPostId = action.payload[action.payload.length - 1].id;

        if (lastPostId !== undefined) {
          state.lastID = lastPostId;
        }

        state.postsList = [...(state.postsList ?? []), ...action.payload];
      } else {
        state.isAllDataFetched = true;
      }
    };

    const setErrorState = (state: any, action: any) => {
      state.status = "failed";
      state.fetchError = action.error.message;
      // console.log(action.error.message);
    };

    builder
      .addCase(thunks.fetchPosts.pending, setLoadingState)
      .addCase(thunks.fetchPosts.fulfilled, setSuccessState)
      .addCase(thunks.fetchPosts.rejected, setErrorState)
      .addCase(thunks.fetchPostById.pending, setLoadingState)
      .addCase(thunks.fetchPostById.fulfilled, setSuccessState)
      .addCase(thunks.fetchPostById.rejected, setErrorState);
  }
});

export const postActions = { ...postSlice.actions };

export default postSlice.reducer;
