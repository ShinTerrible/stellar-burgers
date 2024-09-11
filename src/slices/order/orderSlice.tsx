import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderState } from './type';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

const initialState: TOrderState = {
  orderModalData: null,
  orderByNumber: null,
  orderModalDataLoading: false,
  isOrderByNumberLoading: false,
  error: null
};

//Thunks
export const createOrderBurger = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

//Slice
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCreatedOrder: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderModalDataLoading,
    getOrderByNumberRequest: (state) => state.isOrderByNumberLoading,
    getOrderByNumberSelector: (state) => state.orderByNumber,
    getOrderModalData: (state) => state.orderModalData,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    //запрос заказа по номеру
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderByNumberLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderByNumber = payload.orders[0];
        state.isOrderByNumberLoading = false;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.isOrderByNumberLoading = false;
        state.error = error;
      });
    //создать заказ по номеру
    builder.addCase(createOrderBurger.fulfilled, (state, { payload }) => {
      state.orderModalData = payload.order;
      state.error = null;
    });
  }
});

export const {
  getOrderRequest,
  getOrderByNumberRequest,
  getOrderByNumberSelector,
  getOrderModalData,
  getOrderError
} = orderSlice.selectors;

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
