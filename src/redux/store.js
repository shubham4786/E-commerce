import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import productsReducer from "./products/productsReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
