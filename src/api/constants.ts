export const postPath = "posts";
export const apiUrl = process.env.REACT_APP_API_URL;

export const favoriteItems =
  localStorage.getItem("favoriteItems") !== null &&
  localStorage.getItem("favoriteItems") !== ""
    ? JSON.parse(localStorage.getItem("favoriteItems") as string)
    : [];
