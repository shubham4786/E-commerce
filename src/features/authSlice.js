import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
  userExists: null,
};

const API_URL = "http://localhost:3000/users";

export const checkUserExists = createAsyncThunk(
  "auth/checkUserExists",
  async (email) => {
    const response = await axios.get(`${API_URL}?email=${email}`);
    return response.data.length > 0;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }) => {
    const response = await axios.post(API_URL, { name, email, password });
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await axios.get(
      `${API_URL}?email=${email}&password=${password}`
    );

    if (!response.data[0]) {
      throw new Error("User Not Registered");
    } else if (
      response.data[0].email === email &&
      response.data[0].password === password
    ) {
      return response.data[0];
    } else {
      throw new Error("Invalid email or password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkUserExists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserExists.fulfilled, (state, action) => {
        state.loading = false;
        state.userExists = action.payload;
      })
      .addCase(checkUserExists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
