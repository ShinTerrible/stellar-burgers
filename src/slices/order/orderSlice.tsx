import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderState } from './type';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

const initialState: TOrderState = {
  orderModalData: null,
  orderByNumber: null,
  orderModalDataLoading: false,
  isOrderByNumberLoading: false,
  error: undefined
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
        state.error = undefined;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderByNumber = payload.orders[0];
        state.isOrderByNumberLoading = false;
        state.error = undefined;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.isOrderByNumberLoading = false;
        state.error = error.message;
      });
    //создать заказ по номеру
    builder
      .addCase(createOrderBurger.pending, (state) => {
        state.orderModalDataLoading = true;
      })
      .addCase(createOrderBurger.fulfilled, (state, { payload }) => {
        state.orderModalData = payload.order;
        state.error = undefined;
        state.orderModalDataLoading = false;
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

export const orderReducer = orderSlice.reducer;
