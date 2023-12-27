import { userApi } from "../../Api";

const favorites: any = {
  fetch: async (userId: number) =>
    await userApi.getUserFavourite(userId).then(({ data }) => data),
  add: async (userId: number, postId: number) => {
    await userApi.addUserFavourite(userId, postId).then(({ data }) => data);
  },
  delete: async (userId: number, postId: number) => {
    await userApi.deleteUserFavourite(userId, postId).then(({ data }) => data);
  }
};

export { favorites };
