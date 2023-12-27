import { postApi } from "../../Api";

const posts = {
  fetch: async (queryParams: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await postApi.getPosts(...queryParams).then(({ data }) => data);
  },

  fetchById: async (id: any) => {
    return await postApi.getPostById(id).then(({ data }) => data);
  }
};

export { posts };
