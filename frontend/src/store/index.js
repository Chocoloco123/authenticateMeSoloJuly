import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import images from './images';
import comments from './comments';
import searchResult from './search';
import albums from './albums';

const rootReducer = combineReducers({
  session: sessionReducer,
  images,
  comments,
  searchResult,
  albums,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// export called restoreCSRF calls custom csrfFetch function with /api/csrf/restore as the url parameter
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
