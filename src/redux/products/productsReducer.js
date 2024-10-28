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
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const applyFilters = (
    products,
    selectedSizes,
    priceFilter,
    freeShippingFilter,
    selectedBrands
  ) => {
    return products.filter((product) => {
      const sizeMatch = selectedSizes.length
        ? product.availableSizes.some((size) => selectedSizes.includes(size))
        : true;

      const priceMatch =
        product.price >= priceFilter.min && product.price <= priceFilter.max;

      const freeShippingMatch = freeShippingFilter
        ? product.isFreeShipping === true
        : true;

      const brandMatch = selectedBrands.length
        ? selectedBrands.includes(product.brand)
        : true;

      return sizeMatch && priceMatch && freeShippingMatch && brandMatch;
    });
  };

  const getMinMaxPrice = (products) => {
    const prices = products.map((product) => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  };

  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, status: "loading", error: null };

    case FETCH_PRODUCTS_SUCCESS:
      const uniqueCategories = [
        ...new Set(payload.map((product) => product.category)),
      ];
      return {
        ...state,
        status: "succeeded",
        products: payload,
        categories: uniqueCategories,
      };

    case FETCH_PRODUCTS_FAILURE:
      return { ...state, status: "failed", error: payload };

    case FETCH_CATEGORY_PRODUCTS_REQUEST:
      return { ...state, status: "loading", error: null };

    case FETCH_CATEGORY_PRODUCTS_SUCCESS:
      const { min, max } = getMinMaxPrice(payload);
      return {
        ...state,
        status: "succeeded",
        categoryProducts: payload,
        filteredItems: applyFilters(
          payload,
          state.selectedSizes,
          { min, max },
          state.freeShippingFilter,
          state.selectedBrands
        ),
        priceFilter: { min, max },
        maximumPrice: max,
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
      const size = payload;
      const selectedSizes = state.selectedSizes.includes(size)
        ? state.selectedSizes.filter((s) => s !== size)
        : [...state.selectedSizes, size];
      return {
        ...state,
        selectedSizes,
        filteredItems: applyFilters(
          state.categoryProducts,
          selectedSizes,
          state.priceFilter,
          state.freeShippingFilter,
          state.selectedBrands
        ),
      };

    case UPDATE_PRICE_FILTER:
      const [minPrice, maxPrice] = payload;
      const priceFilter = { min: minPrice, max: maxPrice };
      return {
        ...state,
        priceFilter,
        filteredItems: applyFilters(
          state.categoryProducts,
          state.selectedSizes,
          priceFilter,
          state.freeShippingFilter,
          state.selectedBrands
        ),
      };

    case TOGGLE_FREE_SHIPPING_FILTER:
      const freeShippingFilter = !state.freeShippingFilter;
      return {
        ...state,
        freeShippingFilter,
        filteredItems: applyFilters(
          state.categoryProducts,
          state.selectedSizes,
          state.priceFilter,
          freeShippingFilter,
          state.selectedBrands
        ),
      };

    case TOGGLE_BRAND_FILTER:
      const brand = payload;
      const selectedBrands = state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter((b) => b !== brand)
        : [...state.selectedBrands, brand];
      return {
        ...state,
        selectedBrands,
        filteredItems: applyFilters(
          state.categoryProducts,
          state.selectedSizes,
          state.priceFilter,
          state.freeShippingFilter,
          selectedBrands
        ),
      };

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
            cartItem.id === payload && cartItem.quantity >= 1
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

    case FETCH_ORDER_HISTORY_REQUEST:
      return { ...state, status: "loading", error: null };

    case FETCH_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        orders: payload,
      };

    case FETCH_ORDER_HISTORY_FAILURE:
      return { ...state, status: "failed", error: payload };

    default:
      return state;
  }
};

export default productsReducer;
