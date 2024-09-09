import { TOrder } from '@utils-types';

export type TOrderState = {
  newOrderData: TOrder | null;
  isNewOrderDataLoading: boolean;
  newOrderError: unknown;

  orderByNumber: TOrder | null;
  isOrderByNumberLoading: boolean;
  orderByNumberError: unknown;
};
