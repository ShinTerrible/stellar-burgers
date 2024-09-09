import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderState } from './type';
import { getOrderByNumberApi } from '@api';

const initialState: TOrderState = {
  newOrderData: null,
  isNewOrderDataLoading: false,
  newOrderError: '',

  orderByNumber: null,
  isOrderByNumberLoading: false,
  orderByNumberError: ''
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCreatedOrder: (state) => {
      state.newOrderData = null;
    }
  },
  selectors: {
    getOrderState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderByNumberLoading = true;
        state.orderByNumberError = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderByNumber = payload.orders[0];
        state.isOrderByNumberLoading = false;
        state.orderByNumberError = null;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.isOrderByNumberLoading = false;
        state.orderByNumberError = error;
      });
  }
});

const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

export const { getOrderState } = orderSlice.selectors;

export default orderSlice.reducer;
