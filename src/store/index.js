import { createStore, applyMiddleware, compose } from "redux";
import { createAsyncReducerEnhancer, customThunkMiddleware } from "core";
//import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

/*
const logger = createLogger({
  collapsed: true,
  predicate: () => true // eslint-disable-line no-unused-vars
});
*/

const asyncReducerEnhancer = createAsyncReducerEnhancer(rootReducer);

const enhancer = compose(
  applyMiddleware(
    customThunkMiddleware,
    thunkMiddleware // thunk middleware must go benath custom thunk middleware to make sure custom thunks are consumed
  ),
  asyncReducerEnhancer
);

function configureStore(initialState) {
  let astate = initialState || {};
  if ("localStorage" in window && localStorage.getItem("kaisession")) {
    astate = localStorage.getItem("kaisession");
    astate = JSON.parse(astate);
  }
  const store = createStore(rootReducer, astate, enhancer);

  /* if (module.hot) {
    // eslint-disable-global-require
    module.hot.accept("./reducers", () => {
      const reducers = require("./reducers").default;
      return store.replaceReducer(reducers);
    });
  }*/

  return store;
}

export default configureStore();
