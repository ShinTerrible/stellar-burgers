import { RootState } from '../store';

const orderInfoDataSelector = (number: string) => (state: RootState) => {
  if (state.orderList.orders.length) {
    const data = state.orderList.orders.find((item) => item.number === +number);
    if (data) return data;
  }

  if (state.feed.orders.length) {
    const data = state.feed.orders.find((item) => item.number === +number);
    if (data) return data;
  }

  if (state.order.orderByNumber?.number === +number) {
    return state.order.orderByNumber;
  }

  return null;
};

export default orderInfoDataSelector;
