import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { userReducer, postReducer } from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export const store = createStore(reducer, composeEnhancers(applyMiddleware()));
