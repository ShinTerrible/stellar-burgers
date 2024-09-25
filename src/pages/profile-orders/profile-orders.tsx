import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrderList,
  getOrderListLoading,
  getOrderListSelector
} from '../../slices/orderList/orderListSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrderListSelector);
  const loading: boolean = useSelector(getOrderListLoading);

  if (orders.length === 0) {
    const dispatch = useDispatch();
    dispatch(getOrderList());
  }

  if (loading) return <Preloader />;
  return <ProfileOrdersUI orders={orders} />;
};
