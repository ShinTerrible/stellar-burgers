import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { IngredientState } from './type';

export const initialState: IngredientState = {
  ingredients: [],
  loading: true,
  error: null
};

//Thunk
export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

//Slice
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
        //  очищаем данные об ошибке, которые могли остаться от предыдущего запроса, и взводим флаг loading
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ingredients = payload;
        // в случае успешного запроса мы сбрасываем флаг loading и записываем массив ингредиентов в поле ingredients
      })
      .addCase(getIngredients.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        // в случае ошибки мы сбрасываем флаг loading и записываем данные об ошибке в поле error;
      });
  }
});

export const { selectIngredients, selectLoading } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;

export const ingredientsReducer = ingredientsSlice.reducer;
