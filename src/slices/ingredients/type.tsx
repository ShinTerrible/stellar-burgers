import { TIngredient } from '@utils-types';

export type IngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};
