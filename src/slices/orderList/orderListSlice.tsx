import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderListState } from './type';
import { getOrdersApi } from '@api';

const initialState: TOrderListState = {
  orders: [],
  error: null,
  isLoading: false
};

export const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {},
  selectors: {
    getOrderListSelector: (state) => state.orders
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

const getOrderList = createAsyncThunk('orderList/getOrderList', getOrdersApi);

export const { getOrderListSelector } = orderListSlice.selectors;

export default orderListSlice.reducer;
