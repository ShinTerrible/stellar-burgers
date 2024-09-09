import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeeds, selectIngredients } from '../../slices/feeds/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectIngredients);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    // dispatch(getFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
