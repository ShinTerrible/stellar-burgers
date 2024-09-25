import { TOrder } from '@utils-types';

export type TOrderListState = {
  orders: TOrder[];
  error: null | string | undefined;
  isLoading: boolean;
};
