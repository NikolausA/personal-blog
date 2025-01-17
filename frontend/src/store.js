import { createStore, combineReducers } from "redux";
// import { thunk } from "redux-thunk";
import { userReducer } from "./reducers";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  user: userReducer,
});

export const store = createStore(reducer);
