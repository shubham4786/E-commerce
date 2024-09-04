import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/productsSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    auth: authSlice,
  },
});

export default store;
