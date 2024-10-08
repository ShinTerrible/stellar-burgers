import { expect, test, jest } from '@jest/globals';
import { responsMockData, mockOrderData } from '../../utils/mockData';
import { TOrderState } from './type';
import {
  createOrderBurger,
  getOrderByNumber,
  orderActions,
  orderReducer
} from './orderSlice';

jest.mock('@api');

describe('tests for order slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const initialState: TOrderState = {
    orderModalData: null,
    orderByNumber: null,
    orderModalDataLoading: false,
    isOrderByNumberLoading: false,
    error: undefined
  };

  //тест работы запроа заказа по номеру
  test('should set isLoading to true when getOrderByNumber.pending is dispatched', () => {
    const expectedState = {
      ...initialState,
      isOrderByNumberLoading: true
    };

    const actualState = orderReducer(
      {
        ...initialState,
        isOrderByNumberLoading: false
      },
      getOrderByNumber.pending('', 1)
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isOrderByNumberLoading to false and orderByNumber to data when feedReducer.fulfilled is dispatched', () => {
    const expectedState = {
      ...initialState,
      orderByNumber: mockOrderData[0],
      isOrderByNumberLoading: false,
      error: undefined
    };

    const actualState = orderReducer(
      {
        ...initialState,
        orderByNumber: null,
        isOrderByNumberLoading: false,
        error: undefined
      },
      getOrderByNumber.fulfilled(
        { success: responsMockData.success, orders: responsMockData.orders },
        '',
        1
      )
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isOrderByNumberLoading to false and error to error.massage when getOrderByNumber.rejected is dispatched', () => {
    const expectedState = {
      ...initialState,
      isOrderByNumberLoading: false,
      error: 'test Error'
    };

    const actualState = orderReducer(
      {
        ...initialState,
        isOrderByNumberLoading: true,
        error: undefined
      },
      getOrderByNumber.rejected(new Error('test Error'), '', 1)
    );

    expect(actualState).toEqual(expectedState);
  });

  //создать заказ по номеру
  test('should set orderModalData with data in createOrderBurger.fulfilled and error with undefind', () => {
    const expectedState = {
      ...initialState,
      orderModalData: mockOrderData[0],
      error: undefined
    };

    const actualState = orderReducer(
      {
        ...initialState,
        orderByNumber: null,
        error: undefined
      },
      createOrderBurger.fulfilled(
        { order: responsMockData.orders[0], name: 'str', success: true },
        '',
        ['']
      )
    );

    expect(actualState).toEqual(expectedState);
  });

  //экшен сброса заказа
  test('resetCreatedOrder reducer set state to null', () => {
    const state = {
      ...initialState,
      orderModalData: mockOrderData[0],
      error: undefined
    };

    let result = orderReducer(state, orderActions.resetCreatedOrder());

    expect(result).toMatchObject(initialState);
  });
});
