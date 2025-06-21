import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  cartData: [],
  loading: false,
  error: null,
};

export const fetchCartData = createAsyncThunk(
  "cart/fetchCart",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/v1/cart`);
      return response.data.data.products;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQty: (state, action) => {
      const { id, value } = action.payload;
      const item = state.cartData.find((i) => i.productId._id === id);
      if (item) {
        item.qty = item.qty + value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload;
      });
  },
});

export const { updateQty } = cartSlice.actions;

export default cartSlice.reducer;
