import axios from "axios";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const FETCH_CATEGORY_PRODUCTS_REQUEST =
  "FETCH_CATEGORY_PRODUCTS_REQUEST";
export const FETCH_CATEGORY_PRODUCTS_SUCCESS =
  "FETCH_CATEGORY_PRODUCTS_SUCCESS";
export const FETCH_CATEGORY_PRODUCTS_FAILURE =
  "FETCH_CATEGORY_PRODUCTS_FAILURE";

export const PRODUCT_DATA_REQUEST = "PRODUCT_DATA_REQUEST";
export const PRODUCT_DATA_SUCCESS = "PRODUCT_DATA_SUCCESS";
export const PRODUCT_DATA_FAILURE = "PRODUCT_DATA_FAILURE";

export const FETCH_ORDER_HISTORY_REQUEST = "FETCH_ORDER_HISTORY_REQUEST";
export const FETCH_ORDER_HISTORY_SUCCESS = "FETCH_ORDER_HISTORY_SUCCESS";
export const FETCH_ORDER_HISTORY_FAILURE = "FETCH_ORDER_HISTORY_FAILURE";

export const PLACE_ORDER_REQUEST = "PLACE_ORDER_REQUEST";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_FAILURE";

export const TOGGLE_SIZE_FILTER = "TOGGLE_SIZE_FILTER";
export const UPDATE_PRICE_FILTER = "UPDATE_PRICE_FILTER";
export const TOGGLE_FREE_SHIPPING_FILTER = "TOGGLE_FREE_SHIPPING_FILTER";
export const TOGGLE_BRAND_FILTER = "TOGGLE_BRAND_FILTER";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";

export const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchCategoryProductsRequest = () => ({
  type: FETCH_CATEGORY_PRODUCTS_REQUEST,
});

export const fetchCategoryProductsSuccess = (products) => ({
  type: FETCH_CATEGORY_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchCategoryProductsFailure = (error) => ({
  type: FETCH_CATEGORY_PRODUCTS_FAILURE,
  payload: error,
});

export const productDataRequest = () => ({ type: PRODUCT_DATA_REQUEST });

export const productDataSuccess = (products) => ({
  type: PRODUCT_DATA_SUCCESS,
  payload: products,
});

export const productDataFailure = (error) => ({
  type: PRODUCT_DATA_FAILURE,
  payload: error,
});

export const placeOrderRequest = () => ({ type: PLACE_ORDER_REQUEST });

export const placeOrderSuccess = (order) => ({
  type: PLACE_ORDER_SUCCESS,
  payload: order,
});

export const placeOrderFailure = (error) => ({
  type: PLACE_ORDER_FAILURE,
  payload: error,
});

export const toggleSizeFilter = (size) => ({
  type: TOGGLE_SIZE_FILTER,
  payload: size,
});

export const updatePriceFilter = (priceRange) => ({
  type: UPDATE_PRICE_FILTER,
  payload: priceRange,
});

export const toggleFreeShippingFilter = () => ({
  type: TOGGLE_FREE_SHIPPING_FILTER,
});

export const toggleBrandFilter = (brand) => ({
  type: TOGGLE_BRAND_FILTER,
  payload: brand,
});

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const incrementQuantity = (itemId) => ({
  type: INCREMENT_QUANTITY,
  payload: itemId,
});

export const decrementQuantity = (itemId) => ({
  type: DECREMENT_QUANTITY,
  payload: itemId,
});

export const clearCart = () => ({ type: CLEAR_CART });

export const fetchOrderHistoryRequest = () => ({
  type: FETCH_ORDER_HISTORY_REQUEST,
});

export const fetchOrderHistorySuccess = (orders) => ({
  type: FETCH_ORDER_HISTORY_SUCCESS,
  payload: orders,
});

export const fetchOrderHistoryFailure = (error) => ({
  type: FETCH_ORDER_HISTORY_FAILURE,
  payload: error,
});

export const fetchData = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get(
      "https://e-commerce-data-8zft.onrender.com/products"
    );
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchCategoryProducts = (category) => async (dispatch) => {
  dispatch(fetchCategoryProductsRequest());
  try {
    const response = await axios.get(
      `https://e-commerce-data-8zft.onrender.com/products?category=${category}`
    );
    dispatch(fetchCategoryProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchCategoryProductsFailure(error.message));
  }
};

export const productData = (id) => async (dispatch) => {
  dispatch(productDataRequest());
  try {
    const response = await axios.get(
      `https://e-commerce-data-8zft.onrender.com/products/${id}`
    );
    dispatch(productDataSuccess(response.data));
  } catch (error) {
    dispatch(productDataFailure(error.message));
  }
};

export const placeOrder = (order) => async (dispatch) => {
  dispatch(placeOrderRequest());
  try {
    const response = await axios.post(
      "https://e-commerce-data-8zft.onrender.com/orders",
      order
    );
    dispatch(placeOrderSuccess(response.data));
  } catch (error) {
    dispatch(placeOrderFailure(error.message));
  }
};

export const fetchOrderHistory = (email) => {
  return async (dispatch) => {
    dispatch(fetchOrderHistoryRequest());
    try {
      const response = await axios.get(
        `https://e-commerce-data-8zft.onrender.com/orders?email=${email}`
      );
      dispatch(fetchOrderHistorySuccess(response.data));
    } catch (error) {
      dispatch(fetchOrderHistoryFailure(error));
    }
  };
};
