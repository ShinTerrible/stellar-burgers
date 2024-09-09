import { TConstructorState } from './type';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { orderBurgerApi } from '@api';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const createOrderBurger = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export const burgerSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeFromConstructor: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    reorderConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    resetConstructor: () => initialState
  },
  selectors: {
    getState: (state) => state
  }
});

export const { getState } = burgerSlice.selectors;
export const { removeFromConstructor, reorderConstructor, resetConstructor } =
  burgerSlice.actions;

export default burgerSlice.reducer;
