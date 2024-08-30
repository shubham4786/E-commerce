import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("product/fetchProduct", async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
});

const initialState = {
  products: [],
  status: "idle",
  error: null,
  filteredItems: [],
  selectedSizes: [],
  cart: [],
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

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === itemId
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== itemId);
      }
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
      });
  },
});

export const { toggleSizeFilter, addToCart, removeFromCart, clearCart } =
  productsSlice.actions;
export default productsSlice.reducer;
