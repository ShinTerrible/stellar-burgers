import { FC, useEffect, useMemo, useReducer } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getState,
  createOrderBurger,
  resetConstructor
} from '../../slices/burderConstructor/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';
import getUser from '../../slices/user/userSlice';
import { getOrderListSelector } from '../../slices/orderList/orderListSlice';
import { getOrderState } from '../../slices/order/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const dispatch = useDispatch();

  const constructorItems = useSelector(getState);
  const orderRequest = useSelector(getOrderState).isNewOrderDataLoading;

  const orderModalData = useSelector(getOrderState).newOrderData;

  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  // const orderRequest = false;

  // const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };

  const closeOrderModal = () => {
    // dispatch(resetConstructor());
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
