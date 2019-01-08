import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [promiseMiddleware, thunk];

//Redux store setup
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);

export default store;