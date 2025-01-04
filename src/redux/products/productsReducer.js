import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_QUANTITY,
  FETCH_CATEGORY_PRODUCTS_FAILURE,
  FETCH_CATEGORY_PRODUCTS_REQUEST,
  FETCH_CATEGORY_PRODUCTS_SUCCESS,
  FETCH_ORDER_HISTORY_FAILURE,
  FETCH_ORDER_HISTORY_REQUEST,
  FETCH_ORDER_HISTORY_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  INCREMENT_QUANTITY,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PRODUCT_DATA_FAILURE,
  PRODUCT_DATA_REQUEST,
  PRODUCT_DATA_SUCCESS,
  REMOVE_FROM_CART,
  SET_RATING_FILTER,
  TOGGLE_BRAND_FILTER,
  TOGGLE_FREE_SHIPPING_FILTER,
  TOGGLE_SIZE_FILTER,
  UPDATE_PRICE_FILTER,
} from "./productsActions";

const initialState = {
  products: [],
  product: null,
  status: "idle",
  error: null,
  filteredItems: [],
  selectedSizes: [],
  priceFilter: { min: 0, max: Infinity },
  freeShippingFilter: false,
  maximumPrice: null,
  selectedBrands: [],
  cart: [],
  order: null,
  orders: [],
  categories: [],
  categoryProducts: [],
  ratingFilter: 0,
};

const applyFilters = (products, filters) => {
  const {
    selectedSizes,
    priceFilter,
    freeShippingFilter,
    selectedBrands,
    ratingFilter,
  } = filters;

  return products.filter((product) => {
    const sizeMatch =
      !selectedSizes.length ||
      selectedSizes.some((size) => product.availableSizes.includes(size));

    const priceMatch =
      product.price >= priceFilter.min && product.price <= priceFilter.max;

    const freeShippingMatch = !freeShippingFilter || product.isFreeShipping;

    const brandMatch =
      !selectedBrands.length || selectedBrands.includes(product.brand);

    const ratingMatch = product.rating >= ratingFilter;

    return (
      sizeMatch && priceMatch && freeShippingMatch && brandMatch && ratingMatch
    );
  });
};

const getMinMaxPrice = (products) => {
  const prices = products.map((product) => product.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, status: "loading", error: null };

    case FETCH_PRODUCTS_SUCCESS:
      const categories = [
        ...new Set(payload.map((product) => product.category)),
      ];
      return { ...state, status: "succeeded", products: payload, categories };

    case FETCH_PRODUCTS_FAILURE:
      return { ...state, status: "failed", error: payload };

    case FETCH_CATEGORY_PRODUCTS_REQUEST:
      return { ...state, status: "loading", error: null };

    case FETCH_CATEGORY_PRODUCTS_SUCCESS:
      const priceRange = getMinMaxPrice(payload);
      return {
        ...state,
        status: "succeeded",
        categoryProducts: payload,
        filteredItems: applyFilters(payload, {
          ...state,
          priceFilter: priceRange,
        }),
        priceFilter: priceRange,
        maximumPrice: priceRange.max,
      };

    case FETCH_CATEGORY_PRODUCTS_FAILURE:
      return { ...state, status: "failed", error: payload };

    case PRODUCT_DATA_REQUEST:
      return { ...state, status: "loading", error: null };

    case PRODUCT_DATA_SUCCESS:
      return { ...state, status: "succeeded", product: payload };

    case PRODUCT_DATA_FAILURE:
      return { ...state, status: "failed", error: payload };

    case PLACE_ORDER_REQUEST:
      return { ...state, status: "loading", error: null };

    case PLACE_ORDER_SUCCESS:
      return { ...state, status: "succeeded", order: payload, cart: [] };

    case PLACE_ORDER_FAILURE:
      return { ...state, status: "failed", error: payload };

    case TOGGLE_SIZE_FILTER:
      const selectedSizes = state.selectedSizes.includes(payload)
        ? state.selectedSizes.filter((size) => size !== payload)
        : [...state.selectedSizes, payload];
      return {
        ...state,
        selectedSizes,
        filteredItems: applyFilters(state.categoryProducts, {
          ...state,
          selectedSizes,
        }),
      };

    case UPDATE_PRICE_FILTER:
      const priceFilter = { min: payload[0], max: payload[1] };
      return {
        ...state,
        priceFilter,
        filteredItems: applyFilters(state.categoryProducts, {
          ...state,
          priceFilter,
        }),
      };

    case TOGGLE_FREE_SHIPPING_FILTER:
      const freeShippingFilter = !state.freeShippingFilter;
      return {
        ...state,
        freeShippingFilter,
        filteredItems: applyFilters(state.categoryProducts, {
          ...state,
          freeShippingFilter,
        }),
      };

    case TOGGLE_BRAND_FILTER:
      const selectedBrands = state.selectedBrands.includes(payload)
        ? state.selectedBrands.filter((brand) => brand !== payload)
        : [...state.selectedBrands, payload];
      return {
        ...state,
        selectedBrands,
        filteredItems: applyFilters(state.categoryProducts, {
          ...state,
          selectedBrands,
        }),
      };

    case SET_RATING_FILTER:
      return {
        ...state,
        ratingFilter: payload,
        filteredItems: applyFilters(state.categoryProducts, {
          ...state,
          ratingFilter: payload,
        }),
      };

    case ADD_TO_CART:
      const cartItem = state.cart.find((item) => item.id === payload.id);
      return {
        ...state,
        cart: cartItem
          ? state.cart.map((item) =>
              item.id === payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...payload, quantity: 1 }],
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case FETCH_ORDER_HISTORY_REQUEST:
      return { ...state, status: "loading", error: null };

    case FETCH_ORDER_HISTORY_SUCCESS:
      return { ...state, status: "succeeded", orders: payload };

    case FETCH_ORDER_HISTORY_FAILURE:
      return { ...state, status: "failed", error: payload };

    default:
      return state;
  }
};

export default productsReducer;
