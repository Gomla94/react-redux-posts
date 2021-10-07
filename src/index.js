import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";

const store = createStore(reducers, applyMiddleware(thunk));

//when we apply the middleware, anytime we dispatch an action it goes to react thunk as the middleware,
//it's being passed to the reducers.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
