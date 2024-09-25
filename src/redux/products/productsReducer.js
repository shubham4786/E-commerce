import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_QUANTITY,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  INCREMENT_QUANTITY,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  REMOVE_FROM_CART,
  TOGGLE_SIZE_FILTER,
} from "./productsActions";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  filteredItems: [],
  selectedSizes: [],
  cart: [],
  order: null,
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, status: "loading", error: null };

    case PLACE_ORDER_REQUEST:
      return { ...state, status: "loading", error: null };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        products: payload,
        filteredItems: payload,
      };

    case FETCH_PRODUCTS_FAILURE:
      return { ...state, status: "failed", error: payload };

    case PLACE_ORDER_FAILURE:
      return { ...state, status: "failed", error: payload };

    case PLACE_ORDER_SUCCESS:
      return { ...state, status: "succeeded", order: payload, cart: [] };

    case TOGGLE_SIZE_FILTER:
      const size = payload;
      const selectedSizes = state.selectedSizes.includes(size)
        ? state.selectedSizes.filter((s) => s !== size)
        : [...state.selectedSizes, size];
      const filteredItems = state.products.filter((product) =>
        selectedSizes.length
          ? product.availableSizes.some((s) => selectedSizes.includes(s))
          : true
      );
      return { ...state, selectedSizes, filteredItems };

    case ADD_TO_CART:
      const item = payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...item, quantity: 1 }],
        };
      }

    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === payload
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map((cartItem) =>
            cartItem.id === payload && cartItem.quantity > 1
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== payload),
      };

    case CLEAR_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export default productsReducer;
