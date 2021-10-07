import { combineReducers } from "redux";
import fetchPostsAndUsers from "./fetchPostsReducer";
import fetchUser from "./fetchUserReducer";

export default combineReducers({
  posts: fetchPostsAndUsers,
  users: fetchUser,
});
