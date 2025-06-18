import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  productData: [],
  totalItems: 0,
  loading: false,
  error: null,
};

export const fetchProductData = createAsyncThunk(
  "product/fetchProduct",
  async ({ pageNo = 1, pageSize = 4 }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/product/list?pageSize=${pageSize}&pageNo=${pageNo}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const productslice = createSlice({
  name: "prodct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload.results;
        state.totalItems = action.payload.totalItems;
      });
  },
});

// export const {  } = productslice.actions;

export default productslice.reducer;
