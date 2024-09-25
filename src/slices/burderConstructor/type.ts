import { TConstructorIngredient } from '@utils-types';

export type TConstructorState = {
  bun: null | TConstructorIngredient;
  ingredients: TConstructorIngredient[];
  error: undefined | string;
};
