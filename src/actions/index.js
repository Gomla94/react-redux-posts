import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));
  //whenever we call an action creator inside another action creator we need to dispatch the result of calling the action creator.

  //we use await to make sure that our app will wait until the action creator finishes calling the api,
  //and gets its response before we move on and do anything else inside the main action creator.

  //whenever we dispatch a function, react thunk will invoke it automatically.

  //getState gives us access to all the data inside the redux store, so we use it to access all the posts
  //inside the redux store and map over it to get the unique user ids.
};

const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");
  return dispatch({ type: "FETCH_POSTS", payload: response.data });
};

//when we are using react thunk we will never return an action object from the inner function, in stead
//we are going to manually call the dispactch function with the action we wanna dispatch.

//the problem with async await is that with synchronous code
//it's gonna return a request object instead of action, but with the use of react-thunk
//async await syntax is gonna change only the response of the inner function and we don't care about
//the inner function response, we only care about the return of the action creator which is the outter function.

//the previous solution is gonna make us send the same request 10 times for each post,
//which is 100 request to get only 10 users.

// export const fetchUser = _.memoize(function (id) {
//   return async function (dispatch) {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     return dispatch({ type: "FETCH_USER", payload: response.data });
//   };
// });

//the previous approach where we memoizing the outer function will not solve the issues,
//because the memoized function returns whatever was returned the first time it was called,
//which is the inner function, and react thunk is gonna dispatch it and send its request.

// export const fetchUser = function (id) {
//   return _.memoize(async function (dispatch) {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     return dispatch({ type: "FETCH_USER", payload: response.data });
//   });
// };

//the previous solution will not work because everytime we call the fetchUser action creator,
//we create a new version of the inner function and we memoize it, and it gets called because everytime
//the action creator gets called a new version of it get created.

// export const fetchUser = (id) => (dispatch) => {
//   _memoziedFetchUser(id, dispatch);
// };

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// const _memoziedFetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   return dispatch({ type: "FETCH_USER", payload: response.data });
// });

//here we created a new function outside the action creator and we memoized it outside the action creator
//so that it gets memoized one time and not everytime the action creator gets called.
