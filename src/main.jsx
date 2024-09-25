import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Cart from "./components/Cart.jsx";
import Products from "./components/Products.jsx";
import ProductView from "./components/ProductView.jsx";
import Checkout from "./components/Checkout.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Products />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product/:id" element={<ProductView />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
