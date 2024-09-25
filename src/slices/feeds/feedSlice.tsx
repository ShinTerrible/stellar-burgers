import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TFeedState } from './type';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: false
};

//Thunks
export const getFeeds = createAsyncThunk('feeds/getFeeds', getFeedsApi);

//Slice
export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectLoading: (state) => state.isLoading,
    selectState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        //  очищаем данные об ошибке, которые могли остаться от предыдущего запроса, и взводим флаг loading
      })
      .addCase(getFeeds.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        // в случае успешного запроса мы сбрасываем флаг loading и записываем массив ингредиентов в поле ingredients
      })
      .addCase(getFeeds.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
        // в случае ошибки мы сбрасываем флаг loading и записываем данные об ошибке в поле error;
      });
  }
});

export default feedsSlice.reducer;

export const { selectOrders, selectLoading, selectState } =
  feedsSlice.selectors;
