import axios from "axios";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const PLACE_ORDER_REQUEST = "PLACE_ORDER_REQUEST";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_FAILURE";

export const TOGGLE_SIZE_FILTER = "TOGGLE_SIZE_FILTER";
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

export const fetchData = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get("http://localhost:3000/products");
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const placeOrder = (order) => async (dispatch) => {
  dispatch(placeOrderRequest());
  try {
    const response = await axios.post("http://localhost:3000/orders", order);
    dispatch(placeOrderSuccess(response.data));
  } catch (error) {
    dispatch(placeOrderFailure(error.message));
  }
};
