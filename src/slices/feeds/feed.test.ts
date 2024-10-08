import { expect, test, jest } from '@jest/globals';
import { TFeedState } from './type';
import { feedReducer, getFeeds } from './feedSlice';
import { responsMockData } from '../../utils/mockData';

jest.mock('@api');

describe('tests for ingredients slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
    isLoading: false
  };
  test('should set isLoading  to true when getFeeds.pending is dispatched', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null
    };

    const actualState = feedReducer(
      {
        ...initialState,
        isLoading: true,
        error: null
      },
      getFeeds.pending('')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isLoading to false when getFeeds.fulfilled is dispatched', () => {
    const expectedState = {
      ...responsMockData,
      isLoading: false,
      error: null
    };

    const actualState = feedReducer(
      {
        ...responsMockData,
        isLoading: true,
        error: null
      },
      getFeeds.fulfilled(responsMockData, '', undefined)
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set isLoading to false and error to error.massage when getFeeds.rejected is dispatched', () => {
    const expectedState = {
      ...initialState,
      error: 'test Error',
      isLoading: false
    };

    const actualState = feedReducer(
      {
        ...initialState,
        error: null,
        isLoading: true
      },
      getFeeds.rejected(new Error('test Error'), '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
