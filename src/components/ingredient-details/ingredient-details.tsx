import { FC } from 'react';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { selectIngredients } from '../../slices/ingredients/ingredientSlice';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

type Params = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const { id } = useParams<Params>();

  const ingredientData = useSelector(selectIngredients).find(
    (item: TIngredient) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
