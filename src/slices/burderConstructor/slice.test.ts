import { expect, test, jest } from '@jest/globals';
import {
  addToConstructor,
  burgerSlice,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} from './burgerConstructorSlice';
import {
  mockDataIngredients,
  sortedMockIngredients
} from '../../utils/mockData';
import { TConstructorState } from './type';

// Проверяют редьюсер слайса constructor:
describe('burger constructor slice test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const mockData: TConstructorState = {
    bun: null,
    ingredients: []
  };

  // // обработку экшена добавления ингредиентов;
  test('add bun and ingredient to constructor', () => {
    // // // добавление ингредиента
    let addResult = burgerSlice.reducer(
      mockData,
      addToConstructor(mockDataIngredients[0])
    );

    expect(addResult.ingredients[0]).toMatchObject({
      id: expect.any(String),
      ...mockDataIngredients[0]
    });
    expect(addResult.ingredients.length).toBe(1);

    // // // добавление булки
    const addResultBun = burgerSlice.reducer(
      mockData,
      addToConstructor(mockDataIngredients[1])
    );

    expect(addResultBun.bun).toMatchObject({
      id: expect.any(String),
      ...mockDataIngredients[1]
    });
  });

  // // обработку экшена удаления ингредиента;
  test('remove bun and ingredient from the constructor', () => {
    const state = {
      bun: { id: '123cwsafwe343', ...mockDataIngredients[1] },
      ingredients: [
        { id: '123cwsafwe343', ...mockDataIngredients[0] },
        { id: '456gweg4rtfef', ...mockDataIngredients[0] },
        { id: '789gert3543gf', ...mockDataIngredients[2] }
      ]
    };

    const result = burgerSlice.reducer(state, removeFromConstructor(1));

    expect(result.ingredients).toHaveLength(2);
    expect(result.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
  });

  // //обработку экшена изменения порядка ингредиентов в начинке;
  test('sort ingredients in the constructor', () => {
    const state = {
      ...mockData,
      ingredients: [
        { id: '123cwsafwe343', ...mockDataIngredients[0] },
        { id: '456gweg4rtfef', ...mockDataIngredients[1] },
        { id: '789gert3543gf', ...mockDataIngredients[2] }
      ]
    };

    const result = burgerSlice.reducer(
      state,
      reorderConstructor({ from: 1, to: 0 })
    );

    expect(result).toEqual({ ...mockData, ingredients: sortedMockIngredients });
  });

  // // // сброс конструктора
  test('initial stay should be reset', () => {
    const state = {
      bun: { id: '123cwsafwe343', ...mockDataIngredients[1] },
      ingredients: [
        { id: '123cwsafwe343', ...mockDataIngredients[0] },
        { id: '456gweg4rtfef', ...mockDataIngredients[1] },
        { id: '789gert3543gf', ...mockDataIngredients[2] }
      ]
    };
    const result = burgerSlice.reducer(state, resetConstructor());
    expect(result).toEqual({ ...mockData });
  });
});
