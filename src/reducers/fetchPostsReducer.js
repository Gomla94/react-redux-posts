export default (fetchedPosts = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    default:
      return fetchedPosts;
  }
};
