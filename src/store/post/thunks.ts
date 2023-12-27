import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleName } from "./constants";
import { posts } from "../../api/services/post";

const fetchPosts = createAsyncThunk(`${moduleName}/fetchPosts`, posts.fetch);
const fetchPostById = createAsyncThunk(
  `${moduleName}/fetchPostById`,
  posts.fetchById
);

export default {
  fetchPosts,
  fetchPostById
};
