import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("product/fetchProduct", async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
});

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (order) => {
    const response = await axios.post("http://localhost:3000/orders", order);
    return response.data;
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
  filteredItems: [],
  selectedSizes: [],
  cart: [],
  order: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    toggleSizeFilter: (state, action) => {
      const size = action.payload;
      if (state.selectedSizes.includes(size)) {
        state.selectedSizes = state.selectedSizes.filter((s) => s !== size);
      } else {
        state.selectedSizes.push(size);
      }
      state.filteredItems = state.products.filter((product) =>
        state.selectedSizes.length
          ? product.availableSizes.some((s) => state.selectedSizes.includes(s))
          : true
      );
    },

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },

    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((cartItem) => cartItem.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
        state.cart = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  toggleSizeFilter,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = productsSlice.actions;
export default productsSlice.reducer;
