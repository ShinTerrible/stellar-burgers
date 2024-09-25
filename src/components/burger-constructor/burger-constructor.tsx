import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getState,
  resetConstructor
} from '../../slices/burderConstructor/burgerConstructorSlice';
import {
  createOrderBurger,
  getOrderModalData,
  getOrderRequest,
  orderActions
} from '../../slices/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../slices/user/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const constructorItems = useSelector(getState);
  const orderModalData = useSelector(getOrderModalData);
  const orderRequest = useSelector(getOrderRequest);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const orderData = [
      ...constructorItems.ingredients.map((e) => e._id),
      constructorItems.bun._id
    ];
    if (!user) {
      navigate('/login');
      return;
    } else {
      dispatch(createOrderBurger(orderData));
      dispatch(resetConstructor());
    }
  };

  const closeOrderModal = () => {
    dispatch(orderActions.resetCreatedOrder());
    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
