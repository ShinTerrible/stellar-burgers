import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderListState } from './type';
import { getOrdersApi } from '@api';

const initialState: TOrderListState = {
  orders: [],
  error: null,
  isLoading: false
};

//Thunk
export const getOrderList = createAsyncThunk(
  'orderList/getOrderList',
  getOrdersApi
);

//Slice
export const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {},
  selectors: {
    getOrderListSelector: (state) => state.orders,
    getOrderListLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orders = payload;
      })
      .addCase(getOrderList.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      });
  }
});

export const { getOrderListSelector, getOrderListLoading } =
  orderListSlice.selectors;

export default orderListSlice.reducer;
