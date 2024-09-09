import { FC } from 'react';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  /** DONE */
  // const ingredientData = useSelector((state) => state.ingredients.ingredients);
  // return ingredientData.map((i) => (
  //   <IngredientDetailsUI key={i._id} ingredientData={i} />
  // ));

  const ingredientData = null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
