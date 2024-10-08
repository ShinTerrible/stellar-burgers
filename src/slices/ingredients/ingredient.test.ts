import { expect, test, jest } from '@jest/globals';
import {
  initialState,
  getIngredients,
  ingredientsReducer
} from './ingredientSlice';

jest.mock('@api');

describe('tests for feed slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('should set loading loading to true when getIngredients.pending is dispatched', () => {
    const expectedState = {
      ...initialState,
      loading: true
    };

    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.pending('')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set loading to false when getIngredients.fulfilled is dispatched', () => {
    const expectedState = {
      ...initialState,
      loading: false,
      error: null
    };

    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true,
        error: null
      },
      getIngredients.fulfilled(initialState.ingredients, '', undefined)
    );

    expect(actualState).toEqual(expectedState);
  });

  test('should set loading to false and error to error.massage when getIngredients.rejected is dispatched', () => {
    const expectedState = {
      ...initialState,
      loading: false,
      error: 'test Error'
    };

    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true,
        error: null
      },
      getIngredients.rejected(new Error('test Error'), '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
