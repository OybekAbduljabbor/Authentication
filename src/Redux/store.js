import { createStore, combineReducers } from "redux";

import { reToken } from "./Auth/reAuth";
import { reLoading } from "./Loading/reLoading";

const reducer = combineReducers({
  reToken,
  reLoading,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
