import { SerializedError } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderState = {
  orderModalData: TOrder | null;
  orderByNumber: TOrder | null;
  orderModalDataLoading: boolean;
  isOrderByNumberLoading: boolean;
  error: SerializedError | null;
};
