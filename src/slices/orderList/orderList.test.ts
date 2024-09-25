import { expect, test, jest } from '@jest/globals';
import { responsMockData, mockOrderData } from '../../utils/mockData';
import {
  getOrderList,
  orderListReducer,
  getOrderListSelector,
  getOrderListLoading
} from './orderListSlice';
import { TOrderListState } from './type';

jest.mock('@api');

describe('tests for orderList slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const initialState: TOrderListState = {
    orders: [],
    error: null,
    isLoading: false
  };

  //тест работы запроа заказа по номеру
  test('should set isLoading to true when getOrderList.pending is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: null,
      isLoading: true
    };

    const actualState = orderListReducer(
      {
        ...initialState,
        error: null,
        isLoading: false
      },
      getOrderList.pending('')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isLoading to false and error to nnull when getOrderList.fulfilled is dispatched', () => {
    const expectedState = {
      ...initialState,
      orders: mockOrderData,
      error: null,
      isLoading: false
    };

    const actualState = orderListReducer(
      {
        ...initialState,
        error: null,
        isLoading: true
      },
      getOrderList.fulfilled(mockOrderData, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isOrderByNumberLoading to false and error to error.massage when getOrderList.rejected is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: 'test Error',
      isLoading: false
    };

    const actualState = orderListReducer(
      {
        ...initialState,
        error: null,
        isLoading: false
      },
      getOrderList.rejected(new Error('test Error'), '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
